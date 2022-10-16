# Kütüphane Uygulaması (Node)
Bir kütüphane için, üyeleri ve kitapların üyeler tarafından ödünç alınması işlemlerini yönetebilmek
için bir uygulama geliştirilmiştir.

Uygulamanın üzerinden yapılabilecek işlemler aşağıda listelenmiştir:
- Kullanıcıları listeleme
- Bir kullanıcının bilgilerine erişme (ismi, geçmişte ödünç aldığı kitaplar ve mevcut ödünç aldığı kitaplar)
- Yeni kullanıcı oluşturma
- Kitapları listeleme
- Bir kitabın bilgilerine erişme (ismi ve ortalama değerlendirme puanı)
- Yeni kitap oluşturma
- Kitap ödünç alma
- Kitap teslim etme ve değerlendirme puanı verme

## Klasör Yapısı
> ### **config**:
> Tüm config dosyaları bu klasör içerisinde yer alır. İndex.js dosyasında tek yerden env, config.json ve argumanları alıp sonrasında tek json olarak export ediliyor.
> ### **loaders**:
> Kullanılan uygulamaları başlanngıç tanımlamaları için kullanılmaktadır.
> ### **logs**:
> Sistem loglarının tutulduğu dosyadır. Loglar bunyan adlı tool ile oluşturulmaktadır.
> ### **models**:
> Sistemin veritabanı otomatik olarak oluşturulmaktadır. Javascripte orm yapısını **sequelize** adlı tool kullanılarak sağlanmaktadır. Database bağlantısı için configte bulunan **databases** altındaki **libraryPostgres** kendinize göre güncellenmesi gerekmektedir.
> ### **postgresql-data**:
> Postgresql docker ile kaldırılarak bu klasör volume olarak verilmiştir. Bu klasör volume olarak verilerek **docker up** ederseniz dataların tamamı görülecektir.
> ### **router**: 
> Tüm projede urllerin topnaldığı yerdir.
> ### **services**:
> Proje için controller görevi görmektedir. Tüm fonksiyonlar burada yer almaktadır.


## Database
Database olarak postgresql kullanılmaktadır. Database run etmek için aşağıdaki komut yazılmalıdır.
```bash
docker-compose up -d 
```
Database bağlantı bilgileri;

    Database: library
    User: minexora
    Password: deneme12
    Volume: postgresql-data --> Bu docker da volume olarak verildiğinde birebir veriler görülebilir.

**Not:** Postgresql docker'da kaldırıldığında databaseler oluşmama (volume hatası) durumu olursa proje run edildiğinde otomatik olarak oluşturulmaktadır.
**Bu yüzden DDL eklemedim.**