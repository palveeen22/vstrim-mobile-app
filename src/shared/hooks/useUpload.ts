import { useState } from 'react';
import { apiClient } from '../api/client';

interface UploadFile {
  uri: string;
  type: string;
  name: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  type: string;
  thumbnailUrl: string | null;
}

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (file: UploadFile): Promise<MediaAsset> => {
    setIsUploading(true);
    try {
      const { data: presigned } = await apiClient.post('/media/presigned-url', {
        fileName: file.name,
        mimeType: file.type,
      });

      const blob = await fetch(file.uri).then((r) => r.blob());
      await fetch(presigned.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: blob,
      });

      const { data: media } = await apiClient.post('/media/confirm', {
        mediaId: presigned.mediaId,
      });

      return media;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
}
