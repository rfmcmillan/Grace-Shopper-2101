/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const { expect } = require('chai');
const app = require('supertest')(require('../server/server'));
const {
  db,
  models: { Order, Product, ProductOrders, User },
} = require('../server/db');

describe('Order model and join table defination', function () {
  let order1;
  let order2;
  let user;
  let StrawberryPuff;
  let PineappleCake;
  let IceCreamBar;
  beforeEach(async function () {
    try {
      await db.sync({ force: true });

      StrawberryPuff = await Product.create({
        title: 'Strawberry Puff',
        brand: 'I-Mei',
        description: 'Crispy puff shell cookie with cream filling.',
        price: 3.99,
        inventory: 100,
        country: 'Taiwan',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/51GkdanTqfL.jpg',
      });
      PineappleCake = await Product.create({
        title: 'Pineapple Cake',
        brand: 'Jun-Mei',
        description:
          'A buttery, shortbread-like treat with a pineapple jam filling.',
        price: 36.99,
        inventory: 139,
        country: 'Taiwan',
        imageUrl:
          'https://www.food168.com.tw/upload_files/a2L-detail.jpg?fbclid=IwAR19giBuwx8ZA1xGzD6kzX2oMttS4796rIC8lLPGhcNTuoAzDHQbipL-e0c',
      });

      IceCreamBar = await Product.create({
        title: 'Black Sugar Boba Ice Cream Bar',
        brand: 'Tigersugar',
        description:
          'It contains chewy tapioca pearls mingle with a milk-based tea.',
        price: 4.99,
        inventory: 126,
        country: 'Taiwan',
        imageUrl:
          'https://sethlui.com/wp-content/uploads/2019/11/Tiger-Sugar-Boba-Ice-Cream-Online-2.jpg',
      });
      user = await User.create({
        email: 'russel@snacker.com',
        password: 'abc123',
      });
      [order1] = await user.getOrders({ where: { complete: false } });
      await Order.addProducts(order1.id, [
        [StrawberryPuff.id, 2],
        [PineappleCake.id, 5],
        [IceCreamBar.id, 5],
      ]);
      order2 = await Order.create({});
      await Order.addProducts(order2.id, [
        [PineappleCake.id, 5],
        [IceCreamBar.id, 5],
      ]);
    } catch (error) {
      console.log(error);
    }
  });
  xit('should exist', function () {
    expect(Order).to.exist;
  });
  xit('should contain some orders when they are created', async function () {
    expect((await Order.findAll({})).length).to.equal(2);
  });
  xit('should contain the right datatypes and defaults', async function () {
    const { userId, complete, date_of_purchase, purchased_items } = (
      await Order.findAll({})
    )[0];

    expect(userId).to.equal(user.id);
    expect(complete).to.equal(false);
    expect(date_of_purchase).to.equal(null);
    expect(purchased_items).to.equal(null);
  });
  describe('Purchase class method and instance methods', function () {
    xit('should contain the purchase class method which returns the updated order if based on an already existing order', async function () {
      const purchase = await Order.purchase('2016-05-01', order1.id);

      expect(purchase.id).to.equal(order1.id);
      expect(purchase.userId).to.equal(user.id);
      expect(purchase.complete).to.equal(true);
      expect(purchase.date_of_purchase).to.equal('2016-05-01');
      expect(purchase.purchased_items.length).to.equal(3);
    });
    xit('if order exists without a user should still work and return with no user', async function () {
      const purchase = await Order.purchase('2016-05-05', order2.id);

      expect(purchase.id).to.equal(order2.id);
      expect(purchase.userId).to.equal(null);
      expect(purchase.complete).to.equal(true);
      expect(purchase.date_of_purchase).to.equal('2016-05-05');
      expect(purchase.purchased_items.find((element) => element.amount === 2));
      expect(
        purchase.purchased_items.find(
          (element) => element.title === 'Strawberry Puff'
        )
      );
    });
    xit('it should allow products amount to be increased with the instance methods created', async function () {
      await Order.updateProductsAmount(order1.id, StrawberryPuff.id, 10);
      const products = await User.getCart(user.cart);
      expect(
        products.find(
          (element) =>
            element.title === StrawberryPuff.title && element.amount === 10
        )
      );
      expect(
        products.find(
          (element) =>
            element.title === IceCreamBar.title && element.amount === 5
        )
      );
    });

    xit('it should allow products to be removed with the instance methods created', async function () {
      await Order.updateProductsAmount(order1.id, StrawberryPuff.id, 0);
      const products = await User.getCart(user.cart);
      expect(products.length).to.equal(2);
    });
  });
  describe('Join table', function () {
    xit('Product Orders Should exist', function () {
      expect(ProductOrders).to.exist;
    });
    xit('It should be filled when orders are created', async function () {
      expect(console.log(await ProductOrders.findAll({})).length).to.equal(5);
    });
    xit('should create one row for each product added to an order', async function () {
      expect(
        (await ProductOrders.findAll({ where: { orderId: order1.id } })).length
      ).to.equal(3);
    });
  });

  describe('Order Routes', function () {
    describe('GET', function () {
      it('/api/Orders', async function () {
        const response = await app.get(`/api/order/cart/${user.cart}`);
        const cart = response.body;
        expect(response.status).to.equal(200);
        expect(cart).to.exist;
        expect(cart.find((element) => element.title === 'Strawberry Puff'));
      });

      xit('/api/purchases', async function () {
        await Order.purchase('2016-05-06', order1.id, null, user.id);
        const response = await app.get(`/api/order/purchases/${user.id}`);
        const { purchases } = response.body;
        expect(response.status).to.equal(200);
        expect(purchases).to.exist;
        expect(purchases[0].purchased_items.length).to.equal(3);
      });
    });

    describe('PUT/POST', function () {
      it('/api/Orders/purchase', async function () {
        const purchase = {
          date: '2016-05-06',
          orderId: order1.id,
          products: null,
          userId: user.id,
        };
        const response = await app.post('/api/order/purchase').send(purchase);
        const { order } = response.body;
        expect(response.status).to.equal(200);
        expect(order).to.exist;
        expect(order.purchased_items.length).to.equal(3);
      });
      it('/api/order/updateCart', async function () {
        const update = {
          orderId: order1.id,
          productId: StrawberryPuff.id,
          amount: 15,
        };
        await app.put('/api/order/updateCart').send(update);
        const response = await app.get(`/api/order/cart/${user.cart}`);
        const cart = response.body;
        expect(
          cart.find((element) => element.title === 'Strawberry Puff').amount
        ).to.equal(15);
      });
      it('/api/orders/addToCart', async function () {
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
        });
        const addToCart = { orderId: order1.id, products: [[Tortas.id, 2]] };
        await app.put('/api/order/addToCart').send(addToCart);
        const response = await app.get(`/api/order/cart/${user.cart}`);
        const cart = response.body;
        expect(
          cart.find((element) => element.title === 'Sweet Olive Oil Tortas')
        );
      });
    });
  });
});
