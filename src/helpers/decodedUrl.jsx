import React from 'react'

export default function decodedUrl(encodedURL) {
    const url = decodeURIComponent(encodedURL);
    return url;
}
