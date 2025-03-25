import { PrismaClient } from '@prisma/client';
// const fs = require('fs');
// const path = require('path');
// const axios = require('axios');
// const { createWriteStream } = require('fs');

// // 下载并保存图片的函数
// async function downloadImage(url: string, filepath: string) {
//   const writer = createWriteStream(filepath);

//   const response = await axios({
//     url,
//     method: 'GET',
//     responseType: 'stream',
//   });

//   response.data.pipe(writer);

//   return new Promise((resolve: any, reject) => {
//     writer.on('finish', resolve);
//     writer.on('error', reject);
//   });
// }

// // 遍历 items 数组，下载图片并保存到指定目录
// async function saveImages(items: any) {
//   const dir = path.join(__dirname, '../assets/images'); // 目标目录

//   // 如果目录不存在，创建目录
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }

//   for (const item of items) {
//     // 使用 item.name 作为文件名
//     const filepath = path.join(dir, item.image);

//     try {
//       console.log(`Downloading image for ${item.image}...`);
//       await downloadImage(item.img_url, filepath);
//       console.log(`Image saved as ${filepath}`);
//     } catch (error) {
//       console.error(`Failed to download ${item.image}: ${error.message}`);
//     }
//   }
// }

const prisma = new PrismaClient();

async function main() {
  // const res = await fetch('https://www.dota2.com.cn/items/json');
  // const { itemdata } = await res.json();
  // const arr = Object.keys(itemdata).map((key) => {
  //   const { id, cost, dname, img, img_url } = itemdata[key];
  //   return {
  //     id: Number(id),
  //     cost: cost.toString(),
  //     cname: dname,
  //     name: key,
  //     image: `/items/${img.split('?3')[0]}`,
  //     // img_url,
  //   };
  // });
  // const dbArr = await prisma.item.findMany();
  // const updateArr = arr.filter((item) => {
  //   const ids = dbArr.map((item) => item.id);
  //   return !ids.includes(item.id);
  // });
  // // console.log(updateArr.slice(0, 5), updateArr.length);
  // // saveImages(updateArr);
  // await prisma.item.createMany({
  //   data: updateArr,
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
