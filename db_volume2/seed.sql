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
-- Banco de dados: `ams_task`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `task`
--

CREATE TABLE `task` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id_user` varchar(60) NOT NULL,
  `title` varchar(60) NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `task`
--

INSERT INTO `task` (`id`, `id_user`, `title`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
('03c10de4-c2be-472e-add5-3aa24481427e', 'a6d82bba-8b6c-4b3d-821d-f1e1bf7e5566', 'Primeira tarefa', 'Fazendo o teste da primeira tarefa do user.', 1, '2024-04-26 14:44:01', '2024-04-26 14:44:01'),
('79b379f6-aa8d-4f87-bf5e-6055b15e044f', 'a6d82bba-8b6c-4b3d-821d-f1e1bf7e5566', 'Quarta tarefa - Nome alterado', 'Fazendo o teste da quarta tarefa do user. Essa descrição também foi alterada. :D', 1, '2024-04-26 15:16:16', '2024-04-26 15:41:13'),
('7cd5ed6e-9afd-4ad3-acc1-21dbbf45227b', 'a6d82bba-8b6c-4b3d-821d-f1e1bf7e5566', 'Terceira tarefa', 'Fazendo o teste da terceira tarefa do user.', 1, '2024-04-26 14:48:47', '2024-04-26 14:48:47'),
('857c95e5-2b54-4568-a0ca-b00de9a00dae', 'a6d82bba-8b6c-4b3d-821d-f1e1bf7e5566', 'Terceira tarefa - Nome alterado', 'Fazendo o teste da terceira tarefa do user. Essa descrição também foi alterada.', 1, '2024-04-26 14:48:38', '2024-04-26 14:59:37');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
