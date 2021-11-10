const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const session = require("express-session");

app.use(express.json());

app.use(express.static("express"));

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      secure: false,
      httpOnly: true,
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: true,
    secret: "secretkey",
  })
);

// setup flash meesage midleware
app.use(function (request, response, next) {
  response.locals.message = request.session.message;
  delete request.session.message;
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const dbConnection = require("./connection/db");
const uploadFile = require("./middleware/uploadFile");

const pathFile = "../public/uploads/";

// -----------------Main Page ---------------------------

// SELECT DATE_FORMAT(column_name, '%d/%m/%Y') FROM tablename
app.get("/", (req, res) => {
  let query = `SELECT id, nama, photo, pulau, DATE_FORMAT(diresmikan, "%d-%m-%Y") AS diresmikan FROM provinsi_tb`;
  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      req.session.provinces = [];
      for (let result of results) {
        req.session.provinces.push({
          id: result.id,
          name: result.nama,
          diresmikan: result.diresmikan,
          photo: pathFile + result.photo,
        });
      }
      console.log(results);
      res.render("index", {
        provinces: req.session.provinces,
      });
    });
  });
});

app.get("/provinsi-detail/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT  id, nama, photo, pulau, DATE_FORMAT(diresmikan, "%d-%m-%Y") AS diresmikan FROM provinsi_tb WHERE id = ${id}`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      let provinsi = {
        id: results[0].id,
        nama: results[0].nama,
        diresmikan: results[0].diresmikan,
        pulau: results[0].pulau,
        photo: pathFile + results[0].photo,
      };

      res.render("provinsiDetail", {
        provinsi,
      });
    });
  });
});

// ---------------Provinsi-------------------------------
app.get("/provinsi", (req, res) => {
  let query = `SELECT id, nama, photo, pulau, DATE_FORMAT(diresmikan, "%d-%m-%Y") AS diresmikan FROM provinsi_tb`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      req.session.provinces = [];
      for (let result of results) {
        req.session.provinces.push({
          id: result.id,
          nama: result.nama,
          diresmikan: result.diresmikan,
          photo: pathFile + result.photo,
          pulau: result.pulau,
        });
      }
      res.render("provinsi", {
        provinces: req.session.provinces,
      });
    });
  });
});

app.get("/add-provinsi", (req, res) => {
  res.render("addProvinsi");
});

app.post("/add-provinsi", uploadFile("image"), (req, res) => {
  let { nama, diresmikan, pulau } = req.body;
  let image = "";

  console.log(req.body);

  if (req.file) {
    image = req.file.filename;
  }

  if (image == "") {
    req.session.message = {
      type: "danger",
      message: "Please insert all data",
    };
    res.redirect("/add-provinsi");
  }

  let query = `INSERT INTO provinsi_tb (nama, diresmikan, photo, pulau) VALUES ("${nama}", "${diresmikan}", "${image}", "${pulau}")`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      req.session.message = {
        type: "success",
        message: "Province Added Successfully",
      };
      res.redirect("/add-provinsi");
    });
  });
});

app.get("/edit-provinsi/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT * FROM provinsi_tb WHERE id = "${id}"`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      console.log(results);

      let provinsi = {
        id: results[0].id,
        nama: results[0].nama,
        diresmikan: results[0].diresmikan,
        pulau: results[0].pulau,
      };

      res.render("provinsiEdit", {
        provinsi,
      });
    });
  });
});
app.post("/edit-provinsi/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nama, diresmikan, pulau } = req.body;

  const query = `UPDATE provinsi_tb SET nama="${nama}", diresmikan="${diresmikan}", pulau="${pulau}" WHERE id="${id}"`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      req.session.message = {
        type: "success",
        message: "Edit Successfully",
      };

      res.redirect(`/edit-provinsi/${id}`);
    });
  });
});
app.get("/delete-provinsi/:id", (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM provinsi_tb WHERE id = ${id}`;
  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;
      req.session.message = {
        type: "success",
        message: "Delete successfully",
      };
      res.redirect("/provinsi");
    });
  });
});

// ---------------Kabupaten------------------------------
app.get("/kabupaten", (req, res) => {
  let query = `SELECT kabupaten_tb.id, kabupaten_tb.nama, kabupaten_tb.photo, DATE_FORMAT(kabupaten_tb.diresmikan, "%d-%m-%Y") AS diresmikan, provinsi_tb.nama AS namaProvinsi, provinsi_tb.id AS provinsi_id FROM kabupaten_tb JOIN provinsi_tb ON kabupaten_tb.Provinsi_Id = provinsi_tb.id`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      req.session.districts = [];
      for (let result of results) {
        req.session.districts.push({
          id: result.id,
          nama: result.nama,
          diresmikan: result.diresmikan,
          photo: pathFile + result.photo,
          provinsi: result.namaProvinsi,
        });
      }
      res.render("kabupaten", {
        kabupaten: req.session.districts,
        message: req.session.message,
      });
    });
  });
});
app.get("/add-kabupaten", (req, res) => {
  let query = `SELECT id, nama  FROM provinsi_tb`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      req.session.provinces = [];
      for (let result of results) {
        req.session.provinces.push({
          id: result.id,
          nama: result.nama,
        });
      }
      res.render("addKabupaten", {
        provinces: req.session.provinces,
      });
    });
  });
});

app.post("/add-kabupaten", uploadFile("image"), (req, res) => {
  let { nama, provinsi, diresmikan } = req.body;
  let image = "";

  console.log(req.body);

  if (req.file) {
    image = req.file.filename;
  }

  if (image == "") {
    req.session.message = {
      type: "danger",
      message: "Please insert all data",
    };
    res.redirect("/add-kabupaten");
  }

  let query = `INSERT INTO kabupaten_tb (nama, Provinsi_id, diresmikan, photo) VALUES ("${nama}", ${provinsi}, "${diresmikan}", "${image}")`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      req.session.message = {
        type: "success",
        message: "Kabupaten Added Successfully",
      };
      res.redirect("/add-kabupaten");
    });
  });
});

app.get("/edit-kabupaten/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT * FROM kabupaten_tb WHERE id = "${id}""`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      let kabupaten = {
        id: results[0].id,
        nama: results[0].nama,
        diresmikan: results[0].diresmikan,
        photo: results[0].photo,
      };

      res.render("kabupatenEdit", {
        kabupaten,
      });
    });
  });
});
app.post("/edit-kabupaten/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nama, diresmikan, image } = req.body;

  const query = `UPDATE tb_kabupaten SET name="${nama}", diresmikan="${diresmikan}", photo="${image}" WHERE id= ${id}`;

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      req.session.message = {
        type: "success",
        message: "Edit Successfully",
      };

      res.redirect(`/edit-kabupaten/${id}`);
    });
  });
});

app.get("/delete-kabupaten/:id", (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM kabupaten_tb WHERE id = ${id}`;
  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;
      req.session.message = {
        type: "success",
        message: "Delete successfully",
      };
      res.redirect("/kabupaten");
    });
  });
});

const port = 3000;
const server = http.createServer(app);
server.listen(port);

hbs.handlebars.registerHelper("isAuth", function (value) {
  if (value == true) {
    return false;
  } else {
    return true;
  }
});
