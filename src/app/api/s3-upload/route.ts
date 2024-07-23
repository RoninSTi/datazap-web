import { POST } from 'next-s3-upload/route';

POST.configure({
  async key(req, filename) {
    const { folder, userId } = req.body;

    console.log({ folder, userId });

    return `${folder}/${userId}/${filename}`;
  },
});

export { POST };
