# tikin
Project sử dụng express Nodejs, view engine: handlebars.
Mục tiêu: Ứng dụng phân tán dữ liệu trên nhiều database, cụ thể: redis, mongodb, neo4j, cassandra.
Để cài đặt ứng dụng ta cần thực hiện các bước sau:
b1: Tải project về máy 
b2: Tiến hành cài đặt các database: redis, mongodb, neo4j, cassandra
b3: Import file dữ liệu ở trong thư mục wFolderDatabaseExample vào:
    - File user.csv: import vào cassandra database (lưu ý tạo database tikin sau đó import) Ta tạo bằng lệnh đã ghi ở dưới để tạo database
    - File collections, comments, products ta import vào database mongodb (tạo database tikin sau đó import data vào database đó)
    - Vào neo4j-desktop: tạo project demo với user là admin, mật khẩu là 123456 với quyền public, admin. Sau đó coppy toàn bộ lệnh ở file neo4j.txt vào và chạy.

b4: Vào project mở terminal: gõ npm install. Sau đó chạy lệnh: npm run start
b5: Ta đăng nhập vào user:
    - Với quyền admin: admin/admin
    - Với quyền seller: nguoibanhang1/abc; doan/abc; duong/abc; duy/abc
    - Với buyer: kieuvandoan/abc; test/abc
b6: Tung hoành với sản phẩm demo thôi nào!!!



=========================================
CREATE KEYSPACE tikin WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'} AND durable_writes = true;
use tikin;
==========================================



//tạo table: (không cần)
CREATE TABLE IF NOT EXISTS user (id uuid,username text,password text,fullname text,dateofbirth date, address text,phonenum text,gender text, avatar text, tikixu int,permission text,PRIMARY KEY (id));
