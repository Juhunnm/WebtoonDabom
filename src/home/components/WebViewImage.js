import React from 'react';
import { Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const ITEM_SIZE = WINDOW_HEIGHT * 0.17;


const WebViewImage = ({ imageURL }) => {
    const webViewStyles = {
        width: ITEM_SIZE * 0.7,
        height: ITEM_SIZE * 0.9,
        borderRadius: ITEM_SIZE * 0.03,
    };

    const htmlContent = `
        <html>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <head>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        background-color: #F2F2F2;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: fill;
                    }
                </style>
            </head>
            <body>
                <img src="${imageURL}" />
            </body>
        </html>
    `;

    return (
        <View>
            <WebView
                style={webViewStyles}
                source={{ html: htmlContent }}
                originWhitelist={['*']}
                scrollEnabled={false}
            />
        </View>
    );
};

export default WebViewImage;
