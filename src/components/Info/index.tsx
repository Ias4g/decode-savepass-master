import { ToastAndroid } from "react-native";

type ToastData = {
    visible: boolean;
    message: string;
};

export function ToastMessage({ visible, message }: ToastData) {
    if (visible) {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
        return null;
    }
    return null;
};