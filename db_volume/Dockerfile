# Use a imagem base oficial do MySQL
FROM mysql:8.0

# Defina variáveis de ambiente
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=ams_user

# Copie scripts de inicialização personalizados (se houver)
COPY . /docker-entrypoint-initdb.d/

# Exponha a porta padrão do MySQL
EXPOSE 3306

# Comando para iniciar o MySQL
CMD ["mysqld"]
