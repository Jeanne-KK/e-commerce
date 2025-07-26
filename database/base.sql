-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jul 26, 2025 at 03:54 AM
-- Server version: 9.4.0
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
  `o_address` text NOT NULL,
  `o_email` varchar(100) NOT NULL,
  `o_note` text NOT NULL,
  `o_phone` varchar(20) NOT NULL,
  `o_name` varchar(200) NOT NULL,
  `o_totalprice` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`o_id`, `email`, `o_date`, `o_status`, `o_address`, `o_email`, `o_note`, `o_phone`, `o_name`, `o_totalprice`) VALUES
(1, 'test@test.com', '2025-07-26 03:48:06', 0, '123/23 Chiang Mai  10000', 'test@test.com', 'careful dog', '0129485723', 'Ginta Testna', 669),
(2, 'bin@sss.com', '2025-07-26 03:49:07', 3, '12/3 Chiang Rai 70000', 'bin@sss.com', '', '0987654321', 'Nasus Valor', 1019),
(3, 'bin@sss.com', '2025-07-26 03:51:45', 3, '12/23 Chiang Rai 70000', 'bin@sss.com', '', '0987654321', 'Nasus Valor', 1519);

-- --------------------------------------------------------

--
-- Table structure for table `orderedIn`
--

CREATE TABLE `orderedIn` (
  `o_id` int NOT NULL,
  `v_id` int NOT NULL,
  `v_quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orderedIn`
--

INSERT INTO `orderedIn` (`o_id`, `v_id`, `v_quantity`) VALUES
(1, 7, 1),
(1, 4, 2),
(2, 5, 1),
(2, 6, 1),
(3, 7, 6);

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
(2, 'Hoodie', 'black', 500),
(3, 'Freepick', 'white', 250);

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
(1, 1, 200, 10, 'white', 'S', 1),
(2, 1, 200, 10, 'white', 'M', 1),
(3, 1, 200, 10, 'white', 'L', 1),
(4, 1, 200, 8, 'black', 'M', 1),
(5, 2, 500, 3, 'black', 'M', 1),
(6, 2, 500, 3, 'black', 'L', 1),
(7, 3, 250, 6, 'white', 'M', 1),
(8, 3, 250, 7, 'white', 'S', 1);

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
('bin@sss.com', 'Nasus', 'Valor', '$2b$10$PPwhdeh2h5ZJEwF2YFlhpeiHCh8aWbu0x2f2dvS5qnQThShYQkzeK', 0),
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
  MODIFY `o_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `p_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `productVariant`
--
ALTER TABLE `productVariant`
  MODIFY `v_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
