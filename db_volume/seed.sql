-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07-Maio-2024 às 16:23
-- Versão do servidor: 10.4.28-MariaDB
-- versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ams_user`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
('504c0b64-b30f-4616-8019-f5137d66d44c', 'Patrick Nuno', 'patrick@hotmail.com', '$2a$08$7GjdnWzoYMhlLA9WhSuN.edocLzThDHIJr0KnBgQ36ND/ZFQJU/Du', '2024-04-23 12:39:50', '2024-04-23 12:39:50'),
('a6d82bba-8b6c-4b3d-821d-f1e1bf7e5566', 'Hanniel Almeida', 'gabriel2@hotmail.com', '$2a$08$L1MVmH.9KelSy1K.EOxZ4OnfsU89ozAFCjuOtFhFrxCSQLMCnrMWu', '2024-04-25 21:33:23', '2024-04-25 22:13:45'),
('d09a70b7-aa10-4b73-a82c-06fd355d8237', 'Gabriel Nuno', 'gabriel@hotmail.com', '$2a$08$1ikNJP0rVd5pJS6SkBhh7upQmtlLkTjm7sZnQDteMrniJIzGlDMSi', '2024-04-23 12:41:00', '2024-04-23 12:41:00'),
('e72fe96a-e1d7-4dbb-b939-0d6eedb6cded', 'Lucas Nuno', 'lucas@hotmail.com', '$2a$08$WxIJiwfOceksdefY9U4GQ.Qx336NB74HzOm96inM4Y0eFRda0D1Ya', '2024-04-23 01:27:39', '2024-04-23 01:27:39');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
