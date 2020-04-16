const faker = require('faker');
const path = require('path')
const request = require('request');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose')

function rand(max = 10) {
    return Math.floor(Math.random() * max);
}

async function generateID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function getImage() {
    return new Promise((resolve, reject) => {
        request({ url: 'https://picsum.photos/500/500', followRedirect: false }, (err, res, body) => {
            resolve(`${res.headers.location}`);
        });
    });
}

async function getUser() {
    return new Promise((resolve, reject) => {
        request({ url: 'https://randomuser.me/api/', followRedirect: false }, (err, res, body) => {
            const user = JSON.parse(body);
            resolve(user[Object.keys(user)[0]][0]);
        });
    });
}

const User = require('../models/User');
const Picture = require('../models/Picture');

async function importSeeds() {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

    await User.deleteMany({});
    await Picture.deleteMany({});


    // faked users
    const numberOfUsers = 10;
    let users = [];

    for (let i = 0; i < numberOfUsers; i++) {
        const metadata = await getUser();
        let user = new User({
            name: metadata.name,
            avatar: metadata.picture,
            email: metadata.email,
            dob: metadata.dob.date,
            username: metadata.login.username,
            gender: metadata.gender,
            phone: metadata.phone,
            cell: metadata.cell,
            registered: metadata.registered.date,
            password: 'Qwerty123',
        });

        user = await user.save();

        users.push(user);
        console.log(`User - ${i} - ${user}`);
    }
    // console.log(users);
    /*Object.keys(users).forEach(key => {
        let following = [];
        for (let i = 0; i < rand(numberOfUsers); i++) {
            const randOwnerData = users[Object.keys(users)[rand(numberOfUsers)]];
            const randOwner = { avatar: randOwnerData.avatar.thumbnail, uid: randOwnerData.uid, username: randOwnerData.username };
            if (randOwner.uid !== key && following.find(user => user.uid === randOwner.uid) === undefined) {
                following = [...following, randOwner]
            }

        }

        let followers = [];
        for (let i = 0; i < rand(numberOfUsers); i++) {
            const randOwnerData = users[Object.keys(users)[rand(numberOfUsers)]];
            const randOwner = { avatar: randOwnerData.avatar.thumbnail, uid: randOwnerData.uid, username: randOwnerData.username };
            if (randOwner.uid !== key && followers.find(user => user.uid === randOwner.uid) === undefined) {
                followers = [...followers, randOwner]
            }
        }

        users = {
            ...users, [key]: {
                ...users[key],
                following,
                followers,
            },
        };
    });*/
    
    // faked pictures
    const numberOfPictures = 25;
    let pictures = [];

    for (let i = 0; i < numberOfPictures; i++) {
        const randOwnerData = users[rand(numberOfUsers)];
        const likes = [];
        const comments = [];

        const likesCount = rand();
        const commentsCount = rand();

        for (let j = 0; j < likesCount; j++) {
            const randUserData = users[rand(numberOfUsers)];
            likes.push({
                user: randUserData,
                timestamp: faker.date.past(),
            });
        }

        for (let j = 0; j < commentsCount; j++) {
            const randUserData = users[rand(numberOfUsers)];
            comments.push({
                user: randUserData,
                text: faker.lorem.sentence(),
                timestamp: faker.date.past(),
            });
        }

        const picture = new Picture({
            image: await getImage(),
            description: faker.lorem.words(),
            created: faker.date.past(),
            owner: randOwnerData,
            likes,
            comments,
        });

        await picture.save();
        const user = await User.findById(randOwnerData.id);
        await user.pictures.push(picture);
        await user.save()

        // pictures = [...pictures, picture];
        console.log(`${i} Created picture for ${randOwnerData.username}`);
    }

    process.exit();

    /*const initialJson = {};

    let fileName = 'fakedDB_v2.json';

    if (process.argv[2]) {
        fileName = process.argv[2];
    }


    fs.access(fileName, fs.F_OK, (err) => {
        if (err) {
            fs.writeFile(fileName, JSON.stringify(initialJson, null, 4), (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Success');
                }
            });
        }
    });

    let addLog = (log, users, pictures) => {
        log = {users, pictures};
        return JSON.stringify(log, null, 4);
    };

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            let newLog = addLog(JSON.parse(data), users, pictures);
            fs.writeFile(fileName, newLog, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Success');
                }
            });
        }
    });*/
}

importSeeds();