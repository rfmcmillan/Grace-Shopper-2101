const {
    db,
    models: { Category, Product },
} = require('../server/db')

const init = async () => {
    try {
        await db.sync({ force: true })
        await Category.create({ name: 'salty' })
        const Puff = await Product.create({
            title: 'Strawberry Puff',
            brand: 'I-Mei',
            description: 'Crispy puff shell cookie with cream filling.',
            price: 3.99,
            inventory: 100,
            country: 'Taiwan',
            imageUrl:
                'https://images-na.ssl-images-amazon.com/images/I/51GkdanTqfL.jpg',
        })

        const PineappleCake = await Product.create({
            title: 'Pineapple Cake',
            brand: 'Jun-Mei',
            description:
                'A buttery, shortbread-like treat with a pineapple jam filling.',
            price: 36.99,
            inventory: 139,
            country: 'Taiwan',
            imageUrl:
                'https://www.food168.com.tw/upload_files/a2L-detail.jpg?fbclid=IwAR19giBuwx8ZA1xGzD6kzX2oMttS4796rIC8lLPGhcNTuoAzDHQbipL-e0c',
        })

        const IceCreamBar = await Product.create({
            title: 'Black Sugar Boba Ice Cream Bar',
            brand: 'Tigersugar',
            description:
                'It contains chewy tapioca pearls mingle with a milk-based tea.',
            price: 4.99,
            inventory: 126,
            country: 'Taiwan',
            imageUrl:
                'https://sethlui.com/wp-content/uploads/2019/11/Tiger-Sugar-Boba-Ice-Cream-Online-2.jpg',
        })

        const Roll = await Product.create({
            title: 'Multi Grain Crispy Roll',
            brand: 'Pei Tien',
            description:
                'Multi Grain Crispy Roll is made from 7 natural grains,not too sweet and with a hint of salt.',
            price: 5.99,
            inventory: 186,
            country: 'Taiwan',
            imageUrl:
                'https://www.costco.com.tw/medias/sys_master/images/h9c/h2d/32200999436318.jpg',
        })

        const Jaga = await Product.create({
            title: 'Jaga Pokkuru',
            brand: 'Calbee',
            description:
                'It is a Hokkaido-exclusive snack which made from 100% Hokkaido-grown potatoes.',
            price: 19.99,
            inventory: 243,
            country: 'Japan',
            imageUrl:
                'https://cdn.shopify.com/s/files/1/1969/5775/products/calbee-potato-farm-jaga-pokkuru-180g-japanese-taste_2048x.jpg?v=1608561946',
        })

        const Jelly = await Product.create({
            title: 'Fruit Jelly',
            brand: 'Orihiro',
            description:
                'It is made from real juice and fruit with low calories. ',
            price: 3.99,
            inventory: 159,
            country: 'Japan',
            imageUrl:
                'https://cdn01.sayweee.net/2020-08/iC2HT6NvT8er7C_GMgpCpw.jpg',
        })

        const KakiNoTane = await Product.create({
            title: 'Kaki no tane',
            brand: 'Kameda Seika',
            description:
                'It is made by cutting up kneaded mochi (sticky rice) into small pieces and then coating the surface with soy sauce and other savory ingredients.',
            price: 5.99,
            inventory: 193,
            country: 'Japan',
            imageUrl:
                'https://cdn.shopify.com/s/files/1/1969/5775/products/kameda-kakinotane-snack-rice-crackers-with-peanuts-200g-japanese-taste_5000x.jpg?v=1608570172',
        })

        const Kaya = await Product.create({
            title: 'Kaya',
            brand: 'Ya Kun',
            description:
                'It is a delicious Malaysian jam made with coconut, eggs and caramel.',
            price: 8.99,
            inventory: 296,
            country: 'Singapore',
            imageUrl:
                'https://mynextplaneout.files.wordpress.com/2018/04/single_pack_kaya_jarbig.jpg',
        })

        const YolkChips = await Product.create({
            title: 'Salted Egg Yolk Potato Chips',
            brand: 'The Gold Duck',
            description:
                'Each chip has crunch, salt, and the perfect amount of richness that comes from the salted egg yolk.',
            price: 7.99,
            inventory: 231,
            country: 'Singapore',
            imageUrl:
                'https://mynextplaneout.files.wordpress.com/2018/04/the-golden-duck-salted-egg-yolk-potato-chips-and-fish-skin-crisps.jpg',
        })

        const Kueh = await Product.create({
            title: 'Kueh Lapis Sagu',
            brand: 'BengAWan Solo',
            description:
                "it is soft and wobbly with a rich flavour of coconut milk since it's the main ingredients .",
            price: 12.99,
            inventory: 100,
            country: 'Singapore',
            imageUrl:
                'https://cdn2.sg.orstatic.com/userphoto/photo/0/5N/00143X2B9E38916D116A8Cpx.jpg?fbclid=IwAR0zUIZVaMkRyIqD3ASvvdQjnsMG8s_DflHXeNuqygarliefhGrBcXDSHGI',
        })

        const MilkTablet = await Product.create({
            title: 'Good Candy Milk Tablet',
            brand: 'Thai Royal',
            description:
                'Milk Tablet is a part product from Dairy Farm from King of Thailand.It was made mostly from milk powder(70%)!',
            price: 2,
            inventory: 145,
            country: 'Tailand',
            imageUrl:
                'https://i.ebayimg.com/images/g/-fkAAOSwoGNauIKb/s-l500.jpg',
        })

        const MangoCookies = await Product.create({
            title: "KOALA'S MARCH MANGO(Only in Thailand)",
            brand: 'Lotte',
            description: 'Biscuit with Mango Cream Filling',
            price: 7.99,
            inventory: 231,
            country: 'Tailand',
            imageUrl:
                'https://images-na.ssl-images-amazon.com/images/I/71GTgfolXfL._SL1024_.jpg',
        })

        const Kueh = await Product.create({
            title: 'Roasted seaweed',
            brand: 'Tao Kae Noi',
            description:
                'Paper-thin, lip-smackingly irresistible and in big sheets, Tao Kae Noi seaweed snack is the perfect crunch with the perfect munch!.',
            price: 12.99,
            inventory: 100,
            country: 'Tailand',
            imageUrl:
                'https://i5.walmartimages.com/asr/e6855267-eb34-4f78-a5cc-05cc00e1a7a0_1.b0fae7622fd92aaaa85c3cbb72a71900.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff',
        })

        const Jing = await Product.create({
            title: 'Jing Ba Jian',
            brand: 'Dao Xiang Cun',
            description:
                "It's a box of cakes with 8 different flavors and 8 unique shapes which each gives out a certain kind of blessings.",
            price: 40.99,
            inventory: 117,
            country: 'China',
            imageUrl:
                'https://i.ebayimg.com/images/g/ezAAAOSwDL1f2vdH/s-l1600.jpg?fbclid=IwAR1y6mKCRCdqk-jSlfV5-jSypGnDS3p_O7c-mioIGN_zFF715Hvgd3J8FH8',
        })

        const WantWant = await Product.create({
            title: 'Want Want Senbei',
            brand: 'Want Want',
            description:
                'It is a delicious, cholesterol free, baked, rice cracker snack.',
            price: 4.99,
            inventory: 148,
            country: 'China',
            imageUrl:
                'https://cdn01.sayweee.net/2020-08/vyWXBpMYSHKf2VQf73EXWw.jpg',
        })

        const RoseCake = await Product.create({
            title: 'Rose Cake',
            brand: 'Red Tower',
            description:
                'It is made from  flour, honey ,and rose jam stuffing.',
            price: 10.99,
            inventory: 143,
            country: 'China',
            imageUrl:
                'https://ae01.alicdn.com/kf/HTB1PmfjLXXXXXaRXFXXq6xXFXXXC/Yunnan-specialty-food-Flower-Rose-Cake-Flower-pastry-Chinese-Snack.jpg',
        })

        const Seaweed = await Product.create({
            title: 'Roasted Seaweed',
            brand: 'Dongwon',
            description: 'It is roasted woth sesame oil,rich in fiber.',
            price: 3.99,
            inventory: 137,
            country: 'Korea',
            imageUrl:
                'https://images-na.ssl-images-amazon.com/images/I/91PpDnzvRnL._SL1500_.jpg',
        })

        const Ohgodmallow = await Product.create({
            title: 'Ohgodmallow',
            brand: "S'More",
            description:
                "Cracker with marshmallow inside.There's only 33 kcal in one ",
            price: 4.5,
            inventory: 152,
            country: 'Korea',
            imageUrl:
                'https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/121549827_2788181771413904_2577725995242801950_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=6US_FCE8ZxAAX8xilbf&_nc_ht=scontent-lga3-1.xx&oh=2d4b855b1c09f656afd1b8a8262bf40c&oe=60AB6AAB',
        })

        const TurtleChips = await Product.create({
            title: 'Turtle Chips(Corn Soup Flavor)',
            brand: 'Orion',
            description: 'It comes with unique four thin layer!',
            price: 1.99,
            inventory: 216,
            country: 'Korea',
            imageUrl:
                'https://cdn01.sayweee.net/2020-08/9e9w2TKfRaea2AF73wxNww.jpg',
        })
        const Mix = await Product.create({
            title: 'Nadyadi Mix',
            brand: 'Chhedas',
            description:
                'Nadiyadi Mix gives an unmatched taste that entices and pleases all food buffs. These snacks are seasoned with the unique combination of recipes and ensure lip smacking taste.',
            price: 3.99,
            inventory: 159,
            country: 'India',
            imageUrl:
                'https://m.media-amazon.com/images/I/71tCPVQ9CLL._SL1321_.jpg',
        })

        const MoongDal = await Product.create({
            title: 'Masala Moong Dal',
            brand: 'Haldirams',
            description:
                'This spicy, fried split green gram (moong dal) snack is great for munching. This crunchy and satisfying snack is spiced with coriander powder,cumin powder,and other spices',
            price: 2.99,
            inventory: 270,
            country: 'India',
            imageUrl:
                'https://cdn.powered-by-nitrosell.com/product_images/30/7291/large-haldiramsmoongmasala400g.jpg',
        })

        const Biscuit = await Product.create({
            title: 'Parle-G Biscuits',
            brand: 'Parle',
            description: 'It is made by milk,sugar,and flour.',
            price: 1.99,
            inventory: 149,
            country: 'India',
            imageUrl:
                'https://cdn.shopify.com/s/files/1/0429/1674/1280/products/Parle_G_Gold_950x.png?v=1612815378',
        })

        const Pudding = await Product.create({
            title: 'Le Petit Pot de Crème au Caramel ',
            brand: 'La Laitière',
            description: 'It is made of heavy cream, caramel, sugar and eggs.',
            inventory: 154,
            country: 'French',
            imageUrl:
                'https://bonjourparis.com/wp-content/uploads/2015/07/Pot-de-Creme.jpg?fbclid=IwAR3FQX3q5WeKELo39opmdAke_OHfvJtoOpSXZPRiLDMFT0uaLg9eaabEfLs',
        })

        const Ecolier = await Product.create({
            title: 'Lu Petit Ecolier',
            brand: 'Lu',
            description:
                'French butter biscuit topped with glossy European milk chocolate',
            inventory: 229,
            country: 'French',
            imageUrl:
                'https://i5.walmartimages.com/asr/46ff700c-c48f-4c1e-bda2-7c1ede7794d6.71692f45419c4238cb61b8d89d1d42ae.jpeg',
        })

        const ButterCookies = await Product.create({
            title: 'Butter Cookies with Sea Salt',
            brand: 'St Michel',
            description:
                'It consists of a buttercream, ganache, or jam filling sandwiched between two mini-meringues made with ground almonds, egg whites, and icing sugar.',
            price: 20.99,
            inventory: 117,
            country: 'French',
            imageUrl:
                'https://cdn11.bigcommerce.com/s-arl5b/images/stencil/1280x1280/products/1036/9571/StMichelLargeGaletteSalt__60837.1605033438.png?c=2',
        })

        const Chips = await Product.create({
            title: 'Chips',
            brand: 'Smiths',
            description:
                'We take top quality Aussie potatoes, peel, slice and cook them to perfection using healthier oils and then sprinkle them with your favourite seasoning.',
            price: 2.15,
            inventory: 237,
            country: 'Australia',
            imageUrl:
                'https://theaustralianfoodshop.com/wp-content/uploads/2020/06/11305968042014.jpg.webp',
        })

        const Macadamias = await Product.create({
            title: 'Macadamias',
            brand: 'Macadamias Australia',
            description:
                'Macadamia nuts have a rich, buttery flavor. Roasting or salting the nuts draws out their natural, subtle sweetness and creamy texture.',
            price: 9.99,
            inventory: 158,
            country: 'Australia',
            imageUrl:
                'https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/145514909_2833360123601478_7229567621104676299_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=9267fe&_nc_ohc=-h9jaMQRBikAX8D_6pf&_nc_ht=scontent-lga3-1.xx&oh=73ff6c7f2d95ad2195299d169f5fdf6e&oe=60A94200',
        })

        const Fruit = await Product.create({
            title: 'Dried Fruits',
            brand: 'Angas Park',
            description:
                'It is a blend of dried prunes, apricots, apples, pears and peaches picked at their peak then meticulously dried until the very moment they emerge plump and sweet with a firm texture - hallmarks of the finest dried fruit.',
            price: 10.99,
            inventory: 480,
            country: 'Australia',
            imageUrl:
                'https://cdn0.woolworths.media/content/wowproductimages/large/057242.jpg',
        })

        const Tortas = await Product.create({
            title: 'Sweet Olive Oil Tortas',
            brand: 'Inés Rosales',
            description:
                'Ines Rosales sweet olive oil tortas are all-natural, and made with extra virgin olive oil and the finest ingredients.',
            price: 3,
            inventory: 127,
            country: 'Spain',
            imageUrl:
                'https://cdn.shopify.com/s/files/1/3105/8454/products/Ines-Rosales-Sweet-Tortas-with-spanish-oranges-myPanier-_main_870x870.jpg?v=1569228455',
        })

        const Turrón = await Product.create({
            title: 'Turrón',
            brand: 'Vicens',
            description: 'Creamy classic almond turrón candy bar.',
            price: 9.99,
            inventory: 158,
            country: 'Spain',
            imageUrl:
                'https://lunya.co.uk/wp-content/uploads/2017/11/turron-blando.jpg',
        })

        const Bonbon = await Product.create({
            title: 'Dark Chocolate Stuffed Fig Bonbons',
            brand: 'Rabitos Royale',
            description: 'It is made by figs dipped in rich dark chocolate.',
            price: 24.99,
            inventory: 80,
            country: 'Spain',
            imageUrl:
                'https://cdn.shopify.com/s/files/1/0561/3553/products/ES-260.jpg?v=1610492772',
        })
    } catch (error) {
        console.log(error)
    }
}

init()
