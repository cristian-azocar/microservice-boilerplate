import Koa from 'koa';

const app: Koa = new Koa();
const port: number = +process.env.PORT || 3000;

app.use(async ctx => {
    ctx.body = 'Hello World'
});

app.listen(port, () => console.log(`Server listening on port ${port}`));