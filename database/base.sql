-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jul 15, 2025 at 06:14 PM
-- Server version: 9.3.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `o_id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `o_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `o_status` int NOT NULL,
  `o_address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderedIn`
--

CREATE TABLE `orderedIn` (
  `o_id` int NOT NULL,
  `v_id` int NOT NULL,
  `v_quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `p_id` int NOT NULL,
  `p_name` varchar(100) NOT NULL,
  `p_showcolor` varchar(50) NOT NULL,
  `p_showprice` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`p_id`, `p_name`, `p_showcolor`, `p_showprice`) VALUES
(1, 'Shirt Hello', 'black', 200),
(2, 'Hoodie', 'black', 500);

-- --------------------------------------------------------

--
-- Table structure for table `productVariant`
--

CREATE TABLE `productVariant` (
  `v_id` int NOT NULL,
  `p_id` int NOT NULL,
  `v_price` int NOT NULL,
  `v_stock` int NOT NULL,
  `v_color` varchar(50) NOT NULL,
  `v_size` varchar(50) NOT NULL,
  `v_status` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productVariant`
--

INSERT INTO `productVariant` (`v_id`, `p_id`, `v_price`, `v_stock`, `v_color`, `v_size`, `v_status`) VALUES
(1, 1, 200, 12, 'white', 'S', 1),
(2, 1, 200, 5, 'white', 'M', 1),
(3, 1, 200, 3, 'white', 'L', 1),
(4, 1, 200, 10, 'black', 'M', 1),
(5, 2, 500, 2, 'black', 'M', 1),
(6, 2, 500, 4, 'black', 'L', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `name`, `lastname`, `password`, `type`) VALUES
('test@test.com', 'Ginta', 'Testna', '$2b$10$TnwWhpSVthH3A6JtH2X16uChdhAVova1n5bS.6SEDzQ2DdlSVN2IK', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`o_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `productVariant`
--
ALTER TABLE `productVariant`
  ADD PRIMARY KEY (`v_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `o_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `p_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `productVariant`
--
ALTER TABLE `productVariant`
  MODIFY `v_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
