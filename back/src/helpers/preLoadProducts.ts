import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
    // Smartphones
    {
        name: "iPhone 12 Pro",
        price: 999,
        description: "Un poderoso dispositivo con un increíble sistema de cámara, pantalla Super Retina XDR y capacidades 5G.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero",
        categoryId: 1,
        stock: 15
    },
    // Tablets
    {
        name: "iPad Air",
        price: 599,
        description: "Experimenta potencia y versatilidad con el iPad Air: impresionante pantalla Liquid Retina, rendimiento rápido y soporte para Apple Pencil y Magic Keyboard.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202009",
        categoryId: 3,
        stock: 15
    },
    {
        name: "Apple Magic Keyboard",
        price: 99,
        description: "Experimenta comodidad y precisión con el Apple Magic Keyboard: diseño elegante, teclas sensibles y larga duración de la batería.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXQT2?wid=2000&hei=2000&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1598599162000",
        categoryId: 8,
        stock: 25
    },
    {
        name: "MacBook Pro 13 pulgadas",
        price: 1299,
        description: "Supera tu trabajo con el MacBook Pro con el chip Apple M1, pantalla Retina y batería para todo el día.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011?wid=892&hei=820&&qlt=80&.v=1603406905000",
        categoryId: 2,
        stock: 18
    },
    {
        name: "iPad Air",
        price: 599,
        description: "Descubre el iPad Air con una impresionante pantalla Liquid Retina, chip A14 Bionic y soporte para Apple Pencil y Magic Keyboard.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202009_FMT_WHH?wid=940&hei=1112&fmt=jpeg&qlt=95&.v=1599933955000",
        categoryId: 3,
        stock: 22
    },
    {
        name: "Apple TV 4K",
        price: 179,
        description: "Sumérgete en el video de la más alta calidad con el Apple TV 4K que cuenta con Dolby Atmos, Dolby Vision y soporte para contenido HDR 4K.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
        categoryId: 5,
        stock: 20
    },
    {
        name: "Apple Pencil (2da generación)",
        price: 129,
        description: "Desbloquea nuevas posibilidades con el Apple Pencil, que ofrece escritura precisa, dibujo y capacidades de marcado para iPad Pro.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU8F2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1562954626666",
        categoryId: 8,
        stock: 23
    },
    {
        name: "Apple TV HD",
        price: 149,
        description: "Disfruta de tu contenido favorito en HD con el Apple TV que cuenta con sonido envolvente Dolby Digital Plus 7.1, chip A8 y búsqueda por voz de Siri.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-hero-select-201510_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1596110685000",
        categoryId: 5,
        stock: 18
    },
    {
        name: "iPhone 13",
        price: 799,
        description: "Experimenta el futuro del iPhone con el iPhone 13 que cuenta con capacidades avanzadas de cámara, rendimiento potente y conectividad 5G.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-select-2021",
        categoryId: 1,
        stock: 15
    },
    {
        name: "Apple TV 4K (2da generación)",
        price: 179,
        description: "Sumérgete en un impresionante contenido HDR 4K con el Apple TV 4K que cuenta con HDR de alta velocidad de fotogramas, Dolby Vision y sonido envolvente.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
        categoryId: 5,
        stock: 17
    },
    {
        name: "Cargador Apple MagSafe",
        price: 39,
        description: "Carga tu iPhone 12 o iPhone 13 sin esfuerzo con el Cargador Apple MagSafe que cuenta con alineación magnética y hasta 15W de potencia.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
        categoryId: 8,
        stock: 23
    },
    {
        name: "Cable Apple Thunderbolt 3 (USB-C) (0.8m)",
        price: 39,
        description: "Conecta tus dispositivos Thunderbolt 3 con este cable de alto rendimiento que cuenta con tecnología Thunderbolt 3 y compatibilidad con USB-C.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQ4H2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1503676607000",
        categoryId: 8,
        stock: 16
    },
    {
        name: "Adaptador Apple USB-C Digital AV Multiport",
        price: 69,
        description: "Conecta tus dispositivos USB-C a una pantalla HDMI, dispositivo USB-A y cable de carga USB-C con este versátil adaptador de Apple.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MJ1K2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1521749818000",
        categoryId: 8,
        stock: 17
    },
    {
        name: "Adaptador de corriente USB-C de 20W de Apple",
        price: 19,
        description: "Carga rápida tu iPhone, iPad u otros dispositivos compatibles con este adaptador de corriente USB-C de 20W compacto y conveniente de Apple.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
        categoryId: 8,
        stock: 22
  },

     // Smartphones
    {
        name: "iPhone 12 Pro",
        price: 999,
        description: "Un poderoso dispositivo con un increíble sistema de cámara, pantalla Super Retina XDR y capacidades 5G.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero",
        categoryId: 1,
        stock: 15
    },
    // Tablets
    {
        name: "iPad Air",
        price: 599,
        description: "Experimenta potencia y versatilidad con el iPad Air: impresionante pantalla Liquid Retina, rendimiento rápido y soporte para Apple Pencil y Magic Keyboard.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202009",
        categoryId: 3,
        stock: 15
    },
    {
        name: "Apple Magic Keyboard",
        price: 99,
        description: "Experimenta comodidad y precisión con el Apple Magic Keyboard: diseño elegante, teclas sensibles y larga duración de la batería.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXQT2?wid=2000&hei=2000&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1598599162000",
        categoryId: 8,
        stock: 25
    },
    {
        name: "MacBook Pro 13 pulgadas",
        price: 1299,
        description: "Supera tu trabajo con el MacBook Pro con el chip Apple M1, pantalla Retina y batería para todo el día.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011?wid=892&hei=820&&qlt=80&.v=1603406905000",
        categoryId: 2,
        stock: 18
    },
    {
        name: "iPad Air",
        price: 599,
        description: "Descubre el iPad Air con una impresionante pantalla Liquid Retina, chip A14 Bionic y soporte para Apple Pencil y Magic Keyboard.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202009_FMT_WHH?wid=940&hei=1112&fmt=jpeg&qlt=95&.v=1599933955000",
        categoryId: 3,
        stock: 22
    },
    {
        name: "Apple TV 4K",
        price: 179,
        description: "Sumérgete en el video de la más alta calidad con el Apple TV 4K que cuenta con Dolby Atmos, Dolby Vision y soporte para contenido HDR 4K.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
        categoryId: 5,
        stock: 20
    },
    {
        name: "Apple Pencil (2da generación)",
        price: 129,
        description: "Desbloquea nuevas posibilidades con el Apple Pencil, que ofrece escritura precisa, dibujo y capacidades de marcado para iPad Pro.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU8F2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1562954626666",
        categoryId: 8,
        stock: 23
    },
    {
        name: "Apple TV HD",
        price: 149,
        description: "Disfruta de tu contenido favorito en HD con el Apple TV que cuenta con sonido envolvente Dolby Digital Plus 7.1, chip A8 y búsqueda por voz de Siri.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-hero-select-201510_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1596110685000",
        categoryId: 5,
        stock: 18
    },
    {
        name: "iPhone 13",
        price: 799,
        description: "Experimenta el futuro del iPhone con el iPhone 13 que cuenta con capacidades avanzadas de cámara, rendimiento potente y conectividad 5G.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-select-2021",
        categoryId: 1,
        stock: 15
    },
    {
        name: "Apple TV 4K (2da generación)",
        price: 179,
        description: "Sumérgete en un impresionante contenido HDR 4K con el Apple TV 4K que cuenta con HDR de alta velocidad de fotogramas, Dolby Vision y sonido envolvente.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
        categoryId: 5,
        stock: 17
    },
    {
        name: "Cargador Apple MagSafe",
        price: 39,
        description: "Carga tu iPhone 12 o iPhone 13 sin esfuerzo con el Cargador Apple MagSafe que cuenta con alineación magnética y hasta 15W de potencia.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
        categoryId: 8,
        stock: 23
    },
    {
        name: "Cable Apple Thunderbolt 3 (USB-C) (0.8m)",
        price: 39,
        description: "Conecta tus dispositivos Thunderbolt 3 con este cable de alto rendimiento que cuenta con tecnología Thunderbolt 3 y compatibilidad con USB-C.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQ4H2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1503676607000",
        categoryId: 8,
        stock: 16
    },
    {
        name: "Adaptador Apple USB-C Digital AV Multiport",
        price: 69,
        description: "Conecta tus dispositivos USB-C a una pantalla HDMI, dispositivo USB-A y cable de carga USB-C con este versátil adaptador de Apple.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MJ1K2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1521749818000",
        categoryId: 8,
        stock: 17
    },
    {
        name: "Adaptador de corriente USB-C de 20W de Apple",
        price: 19,
        description: "Carga rápida tu iPhone, iPad u otros dispositivos compatibles con este adaptador de corriente USB-C de 20W compacto y conveniente de Apple.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
        categoryId: 8,
        stock: 22
  },
     // Smartphones
    {
        name: "iPhone 12 Pro",
        price: 999,
        description: "Un poderoso dispositivo con un increíble sistema de cámara, pantalla Super Retina XDR y capacidades 5G.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero",
        categoryId: 1,
        stock: 15
    },
    // Tablets
    {
        name: "iPad Air",
        price: 599,
        description: "Experimenta potencia y versatilidad con el iPad Air: impresionante pantalla Liquid Retina, rendimiento rápido y soporte para Apple Pencil y Magic Keyboard.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202009",
        categoryId: 3,
        stock: 15
    },
    {
        name: "Apple Magic Keyboard",
        price: 99,
        description: "Experimenta comodidad y precisión con el Apple Magic Keyboard: diseño elegante, teclas sensibles y larga duración de la batería.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXQT2?wid=2000&hei=2000&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1598599162000",
        categoryId: 8,
        stock: 25
    },
    {
        name: "MacBook Pro 13 pulgadas",
        price: 1299,
        description: "Supera tu trabajo con el MacBook Pro con el chip Apple M1, pantalla Retina y batería para todo el día.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011?wid=892&hei=820&&qlt=80&.v=1603406905000",
        categoryId: 2,
        stock: 18
    },
    {
        name: "iPad Air",
        price: 599,
        description: "Descubre el iPad Air con una impresionante pantalla Liquid Retina, chip A14 Bionic y soporte para Apple Pencil y Magic Keyboard.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202009_FMT_WHH?wid=940&hei=1112&fmt=jpeg&qlt=95&.v=1599933955000",
        categoryId: 3,
        stock: 22
    },
    {
        name: "Apple TV 4K",
        price: 179,
        description: "Sumérgete en el video de la más alta calidad con el Apple TV 4K que cuenta con Dolby Atmos, Dolby Vision y soporte para contenido HDR 4K.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
        categoryId: 5,
        stock: 20
    },
    {
        name: "Apple Pencil (2da generación)",
        price: 129,
        description: "Desbloquea nuevas posibilidades con el Apple Pencil, que ofrece escritura precisa, dibujo y capacidades de marcado para iPad Pro.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU8F2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1562954626666",
        categoryId: 8,
        stock: 23
    },
    {
        name: "Apple TV HD",
        price: 149,
        description: "Disfruta de tu contenido favorito en HD con el Apple TV que cuenta con sonido envolvente Dolby Digital Plus 7.1, chip A8 y búsqueda por voz de Siri.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-hero-select-201510_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1596110685000",
        categoryId: 5,
        stock: 18
    },
    {
        name: "iPhone 13",
        price: 799,
        description: "Experimenta el futuro del iPhone con el iPhone 13 que cuenta con capacidades avanzadas de cámara, rendimiento potente y conectividad 5G.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-select-2021",
        categoryId: 1,
        stock: 15
    },
    {
        name: "Apple TV 4K (2da generación)",
        price: 179,
        description: "Sumérgete en un impresionante contenido HDR 4K con el Apple TV 4K que cuenta con HDR de alta velocidad de fotogramas, Dolby Vision y sonido envolvente.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
        categoryId: 5,
        stock: 17
    },
    {
        name: "Cargador Apple MagSafe",
        price: 39,
        description: "Carga tu iPhone 12 o iPhone 13 sin esfuerzo con el Cargador Apple MagSafe que cuenta con alineación magnética y hasta 15W de potencia.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
        categoryId: 8,
        stock: 23
    },
    {
        name: "Cable Apple Thunderbolt 3 (USB-C) (0.8m)",
        price: 39,
        description: "Conecta tus dispositivos Thunderbolt 3 con este cable de alto rendimiento que cuenta con tecnología Thunderbolt 3 y compatibilidad con USB-C.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQ4H2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1503676607000",
        categoryId: 8,
        stock: 16
    },
    {
        name: "Adaptador Apple USB-C Digital AV Multiport",
        price: 69,
        description: "Conecta tus dispositivos USB-C a una pantalla HDMI, dispositivo USB-A y cable de carga USB-C con este versátil adaptador de Apple.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MJ1K2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1521749818000",
        categoryId: 8,
        stock: 17
    },
    {
        name: "Adaptador de corriente USB-C de 20W de Apple",
        price: 19,
        description: "Carga rápida tu iPhone, iPad u otros dispositivos compatibles con este adaptador de corriente USB-C de 20W compacto y conveniente de Apple.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
        categoryId: 8,
        stock: 22
  },
     // Smartphones
    {
        name: "iPhone 12 Pro",
        price: 999,
        description: "Un poderoso dispositivo con un increíble sistema de cámara, pantalla Super Retina XDR y capacidades 5G.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero",
        categoryId: 1,
        stock: 15
    },
    // Tablets
    {
        name: "iPad Air",
        price: 599,
        description: "Experimenta potencia y versatilidad con el iPad Air: impresionante pantalla Liquid Retina, rendimiento rápido y soporte para Apple Pencil y Magic Keyboard.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202009",
        categoryId: 3,
        stock: 15
    },
    {
        name: "Apple Magic Keyboard",
        price: 99,
        description: "Experimenta comodidad y precisión con el Apple Magic Keyboard: diseño elegante, teclas sensibles y larga duración de la batería.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXQT2?wid=2000&hei=2000&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1598599162000",
        categoryId: 8,
        stock: 25
    },
    {
        name: "MacBook Pro 13 pulgadas",
        price: 1299,
        description: "Supera tu trabajo con el MacBook Pro con el chip Apple M1, pantalla Retina y batería para todo el día.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011?wid=892&hei=820&&qlt=80&.v=1603406905000",
        categoryId: 2,
        stock: 18
    },
    {
        name: "iPad Air",
        price: 599,
        description: "Descubre el iPad Air con una impresionante pantalla Liquid Retina, chip A14 Bionic y soporte para Apple Pencil y Magic Keyboard.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202009_FMT_WHH?wid=940&hei=1112&fmt=jpeg&qlt=95&.v=1599933955000",
        categoryId: 3,
        stock: 22
    },
    {
        name: "Apple TV 4K",
        price: 179,
        description: "Sumérgete en el video de la más alta calidad con el Apple TV 4K que cuenta con Dolby Atmos, Dolby Vision y soporte para contenido HDR 4K.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
        categoryId: 5,
        stock: 20
    },
    {
        name: "Apple Pencil (2da generación)",
        price: 129,
        description: "Desbloquea nuevas posibilidades con el Apple Pencil, que ofrece escritura precisa, dibujo y capacidades de marcado para iPad Pro.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU8F2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1562954626666",
        categoryId: 8,
        stock: 23
    },
    {
        name: "Apple TV HD",
        price: 149,
        description: "Disfruta de tu contenido favorito en HD con el Apple TV que cuenta con sonido envolvente Dolby Digital Plus 7.1, chip A8 y búsqueda por voz de Siri.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-hero-select-201510_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1596110685000",
        categoryId: 5,
        stock: 18
    },
    {
        name: "iPhone 13",
        price: 799,
        description: "Experimenta el futuro del iPhone con el iPhone 13 que cuenta con capacidades avanzadas de cámara, rendimiento potente y conectividad 5G.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-select-2021",
        categoryId: 1,
        stock: 15
    },
    {
        name: "Apple TV 4K (2da generación)",
        price: 179,
        description: "Sumérgete en un impresionante contenido HDR 4K con el Apple TV 4K que cuenta con HDR de alta velocidad de fotogramas, Dolby Vision y sonido envolvente.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
        categoryId: 5,
        stock: 17
    },
    {
        name: "Cargador Apple MagSafe",
        price: 39,
        description: "Carga tu iPhone 12 o iPhone 13 sin esfuerzo con el Cargador Apple MagSafe que cuenta con alineación magnética y hasta 15W de potencia.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
        categoryId: 8,
        stock: 23
    },
    {
        name: "Cable Apple Thunderbolt 3 (USB-C) (0.8m)",
        price: 39,
        description: "Conecta tus dispositivos Thunderbolt 3 con este cable de alto rendimiento que cuenta con tecnología Thunderbolt 3 y compatibilidad con USB-C.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQ4H2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1503676607000",
        categoryId: 8,
        stock: 16
    },
    {
        name: "Adaptador Apple USB-C Digital AV Multiport",
        price: 69,
        description: "Conecta tus dispositivos USB-C a una pantalla HDMI, dispositivo USB-A y cable de carga USB-C con este versátil adaptador de Apple.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MJ1K2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1521749818000",
        categoryId: 8,
        stock: 17
    },
    {
        name: "Adaptador de corriente USB-C de 20W de Apple",
        price: 19,
        description: "Carga rápida tu iPhone, iPad u otros dispositivos compatibles con este adaptador de corriente USB-C de 20W compacto y conveniente de Apple.",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
        categoryId: 8,
        stock: 22
    }
];




//////////
// const productsToPreLoad: IProduct[] = [
//   {
//       name: "Apple TV HD",
//       price: 149,
//       description: "Disfruta de tu contenido favorito en HD con el Apple TV que cuenta con sonido envolvente...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-hero-select-201510_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1596110685000",
//       categoryId: 5,
//       stock: 18
//   },
//   {
//       name: "iPhone 13",
//       price: 799,
//       description: "Experimenta el futuro del iPhone con el iPhone 13 que cuenta con capacidades avanzadas de...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-select-2021",
//       categoryId: 1,
//       stock: 15
//   },
//   {
//       name: "Apple TV 4K (2da generación)",
//       price: 179,
//       description: "Sumérgete en un impresionante contenido HDR 4K con el Apple TV 4K que cuenta con HDR de alta...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
//       categoryId: 5,
//       stock: 17
//   },
//   {
//       name: "Cargador Apple MagSafe",
//       price: 39,
//       description: "Carga tu iPhone 12 o iPhone 13 sin esfuerzo con el Cargador Apple MagSafe que cuenta con...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
//       categoryId: 8,
//       stock: 23
//   },
//   {
//       name: "Cable Apple Thunderbolt 3 (USB-C) (0.8m)",
//       price: 39,
//       description: "Conecta tus dispositivos Thunderbolt 3 con este cable de alto rendimiento que cuenta con...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQ4H2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1503676607000",
//       categoryId: 8,
//       stock: 16
//   },
//   {
//       name: "Adaptador Apple USB-C Digital AV Multiport",
//       price: 69,
//       description: "Conecta tus dispositivos USB-C a una pantalla HDMI, dispositivo USB-A y cable de carga...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MJ1K2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1521749818000",
//       categoryId: 8,
//       stock: 17
//   },
//   {
//       name: "Adaptador de corriente USB-C de 20W de Apple",
//       price: 19,
//       description: "Carga rápida tu iPhone, iPad u otros dispositivos compatibles con este adaptador de corriente...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
//       categoryId: 8,
//       stock: 22
//   },
//   {
//       name: "Apple Magic Keyboard",
//       price: 99,
//       description: "Experimenta comodidad y precisión con el Apple Magic Keyboard: diseño elegante, teclas...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXQT2?wid=2000&hei=2000&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1598599162000",
//       categoryId: 8,
//       stock: 25
//   },
//   {
//       name: "MacBook Pro 13 pulgadas",
//       price: 1299,
//       description: "Supera tu trabajo con el MacBook Pro con el chip Apple M1, pantalla Retina y batería para todo...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011?wid=892&hei=820&&qlt=80&.v=1603406905000",
//       categoryId: 2,
//       stock: 18
//   },
//   {
//       name: "iPad Air",
//       price: 599,
//       description: "Descubre el iPad Air con una impresionante pantalla Liquid Retina, chip A14 Bionic y soporte...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202009_FMT_WHH?wid=940&hei=1112&fmt=jpeg&qlt=95&.v=1599933955000",
//       categoryId: 3,
//       stock: 22
//   },
//   {
//       name: "Apple TV 4K",
//       price: 179,
//       description: "Sumérgete en el video de la más alta calidad con el Apple TV 4K que cuenta con Dolby Atmos,...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
//       categoryId: 5,
//       stock: 20
//   },
//   {
//       name: "Apple Pencil (2da generación)",
//       price: 129,
//       description: "Desbloquea nuevas posibilidades con el Apple Pencil, que ofrece escritura precisa, dibujo y...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU8F2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1562954626666",
//       categoryId: 8,
//       stock: 23
//   },
//   {
//       name: "Apple TV HD",
//       price: 149,
//       description: "Disfruta de tu contenido favorito en HD con el Apple TV que cuenta con sonido envolvente...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-hero-select-201510_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1596110685000",
//       categoryId: 5,
//       stock: 18
//   },
//   {
//       name: "iPhone 13",
//       price: 799,
//       description: "Experimenta el futuro del iPhone con el iPhone 13 que cuenta con capacidades avanzadas de...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-select-2021",
//       categoryId: 1,
//       stock: 15
//   },
//   {
//       name: "Apple TV 4K (2da generación)",
//       price: 179,
//       description: "Sumérgete en un impresionante contenido HDR 4K con el Apple TV 4K que cuenta con HDR de alta...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
//       categoryId: 5,
//       stock: 17
//   },
//   {
//       name: "Cargador Apple MagSafe",
//       price: 39,
//       description: "Carga tu iPhone 12 o iPhone 13 sin esfuerzo con el Cargador Apple MagSafe que cuenta con...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
//       categoryId: 8,
//       stock: 23
//   },
//   {
//       name: "Cable Apple Thunderbolt 3 (USB-C) (0.8m)",
//       price: 39,
//       description: "Conecta tus dispositivos Thunderbolt 3 con este cable de alto rendimiento que cuenta con...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQ4H2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1503676607000",
//       categoryId: 8,
//       stock: 16
//   },
//   {
//       name: "Adaptador Apple USB-C Digital AV Multiport",
//       price: 69,
//       description: "Conecta tus dispositivos USB-C a una pantalla HDMI, dispositivo USB-A y cable de carga...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MJ1K2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1521749818000",
//       categoryId: 8,
//       stock: 17
//   },
//   {
//       name: "Adaptador de corriente USB-C de 20W de Apple",
//       price: 19,
//       description: "Carga rápida tu iPhone, iPad u otros dispositivos compatibles con este adaptador de corriente...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1603996255000",
//       categoryId: 8,
//       stock: 22
//   },
//   {
//       name: "Apple Magic Keyboard",
//       price: 99,
//       description: "Experimenta comodidad y precisión con el Apple Magic Keyboard: diseño elegante, teclas...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXQT2?wid=2000&hei=2000&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1598599162000",
//       categoryId: 8,
//       stock: 25
//   },
//   {
//       name: "MacBook Pro 13 pulgadas",
//       price: 1299,
//       description: "Supera tu trabajo con el MacBook Pro con el chip Apple M1, pantalla Retina y batería para todo...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011?wid=892&hei=820&&qlt=80&.v=1603406905000",
//       categoryId: 2,
//       stock: 18
//   },
//   {
//       name: "iPad Air",
//       price: 599,
//       description: "Descubre el iPad Air con una impresionante pantalla Liquid Retina, chip A14 Bionic y soporte...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202009_FMT_WHH?wid=940&hei=1112&fmt=jpeg&qlt=95&.v=1599933955000",
//       categoryId: 3,
//       stock: 22
//   },
//   {
//       name: "Apple TV 4K",
//       price: 179,
//       description: "Sumérgete en el video de la más alta calidad con el Apple TV 4K que cuenta con Dolby Atmos,...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1617732707000",
//       categoryId: 5,
//       stock: 20
//   },
//   {
//       name: "Apple Pencil (2da generación)",
//       price: 129,
//       description: "Desbloquea nuevas posibilidades con el Apple Pencil, que ofrece escritura precisa, dibujo y...",
//       image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU8F2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1562954626666",
//       categoryId: 8,
//       stock: 23
//   }
// ];


export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
