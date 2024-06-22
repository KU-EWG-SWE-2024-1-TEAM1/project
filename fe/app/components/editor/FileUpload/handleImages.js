import { uploadBase64Image } from "@/app/components/editor/FileUpload/uploadVase64Image";

export const handleDescriptionImages = async (description, title) => {
    const base64Images = description.match(/<img[^>]+src="data:image\/[a-zA-Z]+;base64,[^"]+"[^>]*>/g) || [];
    const uploadPromises = base64Images.map(async (base64Image, index) => {
        const base64String = base64Image.match(/src="([^"]+)"/)[1];
        const fileName = `${title.replace(/\s+/g, '_')}_${index + 1}.png`; // 글 제목을 기반으로 파일명 생성
        return await uploadBase64Image(base64String, fileName);
    });

    const uploadedImageKeys = await Promise.all(uploadPromises);

    let updatedDescription = description;
    base64Images.forEach((base64Image, index) => {
        const base64String = base64Image.match(/src="([^"]+)"/)[1];
        const imageUrl = `${uploadedImageKeys[index]}`;
        const updatedImageTag = base64Image.replace(base64String, imageUrl);
        updatedDescription = updatedDescription.replace(base64Image, updatedImageTag);
    });

    return updatedDescription;
};
