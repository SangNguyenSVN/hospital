// mimeService.ts

// Hàm lấy loại MIME từ URI
export const getMimeType = (uri: string) => {
    const fileExtension = uri.split('.').pop()?.toLowerCase();
    switch (fileExtension) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
        default:
            return 'image/jpeg'; // MIME mặc định
    }
};
