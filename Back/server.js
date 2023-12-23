const port = 7010;
const Koa = require("koa");
const app = new Koa();

const cors = require("@koa/cors");
app.use(cors());

const { koaBody } = require("koa-body");
app.use(koaBody({
    urlencoded: true,
    multipart: true,
    json: true,
}));

const uuid = require('uuid');

// Список тикетов
let tasksCollection = [
    {
        'id': '1',
        'name': 'Поменять краску в принтере, ком. 404',
        'description': 'Поменять краску в принтере, ком. 404',
        'status': false, 
        'created': '23.11.2023, 10:15:21',
    }, 
    {
        'id': '2',
        'name': 'Переустановить Windows. ПК-Hall24',
        'description': 'Переустановить Windows. ПК-Hall24',
        'status': false, 
        'created': '22.11.2023, 17:32:43',
    },
    {
        'id': '3',
        'name': 'Установить обновление KB-XXX',
        'description': 'Вышло критическое обновление для Windows, нужно поставить обновления в следующем приоритете: 1. Сервера (не забыть сделать бэкап!) 2. Рабочие станции',
        'status': false, 
        'created': '23.11.2023, 15:44:33',
    },
];

app.use((ctx, next) => {
    ctx.response.body = "works";

    next();
});

// Отображение списка тикетов
app.use((ctx, next) => {
    if (ctx.request.method !== "GET") {
        next();
            
        return;
    }

    ctx.response.body = tasksCollection;
    ctx.response.set('Access-Control-Allow-Origin', '*');

    next();
});


// Добавление тикета
app.use((ctx, next) => {
    if (ctx.request.method !== "POST") {
        next();
            
        return;
    }

    const { name, description } = ctx.request.body;

    ctx.response.set('Access-Control-Allow-Origin', '*');

    if (name === "" && description === "") {
        ctx.response.set('Access-Control-Allow-Origin', '*');
        ctx.response.body = "Ошибка!";
        return;
    }

    const date = new Date();
    tasksCollection.push({
        'id': uuid.v4(),
        'name': name,
        'description': description,
        'status': false, 
        'created': date.toLocaleString(),
    });
        
    ctx.response.body = "OK";
    next();
});

// Удаление тикета
app.use((ctx, next) => {
    if (ctx.request.method !== "DELETE") {
        next();
            
        return;
    }

    const { id } = ctx.request.query;

    ctx.response.set('Access-Control-Allow-Origin', '*');
    
    if (tasksCollection.every((task) => task.id !== id)) {
        ctx.response.set('Access-Control-Allow-Origin', '*');
        ctx.response.status = 400;
        ctx.response.body = "task doesn\'t exists";

        return;
    }

    tasksCollection = tasksCollection.filter((task) => task.id !== id);
        
    ctx.response.body = "OK";
    next();
});

// Изменение тикета
app.use((ctx, next) => {
    if (ctx.request.method !== "PUT") {
        next();
            
        return;
    }

    ctx.response.set('Access-Control-Allow-Origin', '*');

    const { id } = ctx.request.query;
    if (tasksCollection.every((task) => task.id !== id)) {
        ctx.response.set('Access-Control-Allow-Origin', '*');
        ctx.response.status = 400;
        ctx.response.body = "task doesn\'t exists";

        return;
    }

    // Редактирование тикета
    if(ctx.request.body) {
        const { name, description } = ctx.request.body;

        tasksCollection.forEach((task) => {
            if(task.id === id) {
                task.name = name;
                task.description = description;
            }
    
            return tasksCollection;
        });

        ctx.response.body = "OK";
        next();
    } else {
    // Изменение статуса тикета
        tasksCollection.forEach((task) => {
            if(task.id === id) {
                if(task.status === false) {
                    task.status = true;
                } else {
                    task.status = false;
                }
            }
    
            return tasksCollection;
        });
        
        ctx.response.body = "OK";
    
        next();
    }
});

app.listen(port, () => {
    console.log("Server listened on port " + port);
});
