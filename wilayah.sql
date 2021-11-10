-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Nov 2021 pada 15.56
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wilayah`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kabupaten_tb`
--

CREATE TABLE `kabupaten_tb` (
  `id` int(11) NOT NULL,
  `nama` varchar(150) DEFAULT NULL,
  `Provinsi_id` int(11) DEFAULT NULL,
  `diresmikan` date DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kabupaten_tb`
--

INSERT INTO `kabupaten_tb` (`id`, `nama`, `Provinsi_id`, `diresmikan`, `photo`) VALUES
(6, 'Kabupaten Aceh Barat', 11, '1945-08-17', '1636553876380-Lambang_Kabupaten_Aceh_Barat.png'),
(7, 'Kabupaten Aceh Barat Daya', 11, '1959-11-19', '1636553915572-50px-Lambang_Kabupaten_Aceh_Barat_Daya.png'),
(8, 'Bandung', 15, '1945-05-01', '1636553984003-Lambang_Kabupaten_Bandung,_Jawa_Barat,_Indonesia.svg.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `provinsi_tb`
--

CREATE TABLE `provinsi_tb` (
  `id` int(11) NOT NULL,
  `nama` varchar(150) DEFAULT NULL,
  `diresmikan` date DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `pulau` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `update_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `provinsi_tb`
--

INSERT INTO `provinsi_tb` (`id`, `nama`, `diresmikan`, `photo`, `pulau`, `created_at`, `update_at`) VALUES
(11, 'Aceh', '1959-12-07', '1636552477860-Aceh.svg.png', 'sumatra', '2021-11-10 20:54:37', '2021-11-10 20:54:37'),
(12, 'Sumatra Utara', '1956-11-29', '1636552709297-North_Sumatra.svg.png', 'sumatra', '2021-11-10 20:58:29', '2021-11-10 20:58:29'),
(13, 'undefined', '0000-00-00', '1636552756744-West_Sumatra.svg.png', 'undefined', '2021-11-10 20:59:16', '2021-11-10 20:59:16'),
(14, 'Banten', '2000-10-04', '1636553040725-Flag_of_Banten,_Indonesia.svg.png', 'Jawa', '2021-11-10 21:04:00', '2021-11-10 21:04:00'),
(15, 'Jawa Barat', '1950-07-04', '1636553097390-103px-Coat_of_arms_of_West_Java.svg.png', 'Jawa', '2021-11-10 21:04:57', '2021-11-10 21:04:57');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Provinsi_id` (`Provinsi_id`);

--
-- Indeks untuk tabel `provinsi_tb`
--
ALTER TABLE `provinsi_tb`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `provinsi_tb`
--
ALTER TABLE `provinsi_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `kabupaten_tb`
--
ALTER TABLE `kabupaten_tb`
  ADD CONSTRAINT `kabupaten_tb_ibfk_1` FOREIGN KEY (`Provinsi_id`) REFERENCES `provinsi_tb` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
