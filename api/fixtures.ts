import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";
import Category from "./models/Category";
import Product from "./models/Product";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');
        await db.dropCollection('products');
    } catch (e) {
        console.log('Collections were not presents, skipping drop!');
    }

    const [userMolly, userSally] = await User.create(
        {
            username: 'Molly',
            password: '123',
            token: randomUUID(),
            displayName: 'Molly Moon',
            phoneNumber: '+996999999999'
        },
        {
            username: 'Sally',
            password: '123',
            token: randomUUID(),
            displayName: 'Sally Rooney',
            phoneNumber: '+996999888888'
        },
    );

    const [categoryTool, categoryDecor, categoryPackage, categoryIngredients] = await Category.create(
        {
            title: 'Tool'
        },
        {
            title: 'Decor'
        },
        {
            title: 'Package'
        },
        {
            title: 'Ingredients'
        },
    );

    await Product.create(
        {
            user: userMolly._id,
            category: categoryTool._id,
            title: 'Миксер планетарный GEMLUX GL-SM-88R "Красный',
            description: 'Модный планетарный миксер Gemlux GL-SM-88R в глянцево-красном корпусе поможет вам в решении любых, даже самых специфических, кулинарных вопросов. Смешивайте бисквиты, взбивайте сливки, кремы, муссы и яйца, объединяйте любые ингредиенты, приготовьте пюре или фарш, не ограничивайте себя в выборе блюд и техник обработки.',
            price: 12000,
            image: 'fixtures/mixer.jpeg'
        },
        {
            user: userMolly._id,
            category: categoryTool._id,
            title: 'Блендер погружной G200 Pro-2 Light Grey',
            description: 'Блендер BAMIX с его мощным, тихим и долговечным двигателем - идеальный партнер для великолепных кулинарных шедевров. Корпус блендера BAMIX Pro-2 G200 Light Grey изготовлен из нейлона. Нейлон имеет высокую сопротивляемость к ударам и разрушению. Нейлон обладает невероятным сочетанием свойств: высокой прочностью, термостойкостью, эластичностью и устойчивостью ко многим химическим реагентам.',
            price: 8000,
            image: 'fixtures/blender.jpeg'
        },
        {
            user: userSally._id,
            category: categoryTool._id,
            title: 'Духовой шкаф Hansa BOEI684121',
            description: 'Духовой шкаф Hansa BOEI684121 представлен в стекле черного цвета и панелью из нержавеющей стали. 8 режимов нагрева помогут разнообразить поднять уровень приготовления. Цифровой таймер с системой отложенного старта и автоматического отключения, теперь вы сможете готовить не отвлекаясь от важных дел! Противни ProСook с антипригарным покрытием и дизайном в виде сот обеспечивают циркуляцию воздуха отменный вкус запекаемых блюд. Процесс ухода за духовкой станет удобным благодаря очистке паром Aqualytic и легко моющейся эмали, лишенной пор и полостей.',
            price: 40000,
            image: 'fixtures/oven.png'
        },
        {
            user: userSally._id,
            category: categoryDecor._id,
            title: 'Посыпка кондитерская шарики 2 мм 50 г',
            description: 'Милое украшение в виде маленьких бусинок для вашего тортика или домашних капкейков и пряников! Индивидуальная упаковка в полиэтиленовых пакетах весом по 50 гр.',
            price: 40000,
            image: 'fixtures/decor-1.jpeg'
        },
        {
            user: userMolly._id,
            category: categoryDecor._id,
            title: 'Украшение кондитерское сахарное мини-безе',
            description: 'Используйте сахарное украшение мини-безе нежного сиреневого цвета для оформления ваших десертов. Благодаря своей легкости и небольшому размеру мини-безе станет идеальным вариантом для декора.',
            price: 100,
            image: 'fixtures/meringue.jpeg'
        },
        {
            user: userMolly._id,
            category: categoryPackage._id,
            title: 'Коробка для торта',
            description: 'Коробка для торта самосборная и не требует дополнительного скрепления. Придайте коробке форму, поместите десерт внутрь и закройте крышку.',
            price: 150,
            image: 'fixtures/box.jpeg'
        },
        {
            user: userSally._id,
            category: categoryPackage._id,
            title: 'Коробка для капкейка',
            description: 'Картонная коробка белого цвета для ваших вкусных капкейков и кексов!',
            price: 80,
            image: 'fixtures/box-cupcake.jpg'
        },
        {
            user: userSally._id,
            category: categoryIngredients._id,
            title: 'Мука "Яшар" высшего сорта',
            description: 'Пшеничная мука"Яшар" высшего сорта обогащенная микроэлементами и витаминами  прекрасно подойдет для  выпечки пышного, красивого хлеба. Кроме того для дрожжевого,  слоеного и песочного  теста. Так же его часто используют при приготовлении  соусов и подливок. Готовые изделия имеют хороший объем, пышность и аппетитный аромат.',
            price: 120,
            image: 'fixtures/flour.png'
        },
        {
            user: userSally._id,
            category: categoryIngredients._id,
            title: 'Сыр творожный Hochland Cremette',
            description: 'Добавьте своим десертам насыщенный сливочный вкус с творожным сыром Hochland Для Кулинарии. Специализированный сыр отлично подойдет для приготовления чизкейка и других десертов, а также для обтяжки тортов.',
            price: 1500,
            image: 'fixtures/Hochland_Cremette.jpeg'
        },
        {
            user: userSally._id,
            category: categoryIngredients._id,
            title: 'Шоколад молочный Callebaut (Бельгия)',
            description: 'Шоколад рецептуры 823NV – это настоящий шоколад бельгийского производства, характеризующийся высоким качеством и превосходным вкусом. В нем отлично сбалансированы такие ингредиенты как молоко, какао и карамель. Шоколад выпускается в специально разработанной для быстрой плавки капельках – каллетах. Это небольшие шоколадные монетки, которые, благодаря своему размеру, быстро нагреваются (чего нельзя сказать о плитках или блоках) и превращаются в жидкое состояние. Кроме того, каллеты удобно дозировать. Шоколад может быть использован как для глазировки конфет и других кондитерских изделий, так и для отлива фигурок и конфет.',
            price: 2000,
            image: 'fixtures/chocolate.jpg'
        },
        {
            user: userMolly._id,
            category: categoryIngredients._id,
            title: 'Сливки БМК 33%',
            description: 'Сливки 35% Брянского молочного комбината, 1000 г БЗМЖ (без заменителя молочных жиров), представляют собой белую с легким кремовым оттенком однородную массу, можно сказать очень жирное молоко, без взвешенных частиц жира и осадка. В молочной промышленности этот вид жирных сливок используется для изготовления масла сливочного и сметаны. В домашних условиях хозяйки очень часто используют сливки 35% жирности для приготовления вкусных и сытных десертов, сладких блюд, великолепных воздушных кремов, а также кондитерских изделий.',
            price: 650,
            image: 'fixtures/cream.jpg'
        }
    );
};

run().catch(console.error);