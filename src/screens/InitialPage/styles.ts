import { Dimensions, StyleSheet } from "react-native";
const Width = Dimensions.get('window').width * 0.5
const Height = Dimensions.get('window').height * 0.2

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: 24,
        alignItems: "center",
        backgroundColor: '#FFFFFF',
    },

    logoPng: {
        width: Width,
        height: Height,
        marginTop: 150
    },

    title: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 10
    },

    description: {
        color: '#000000',
        fontSize: 14
    },

    footer: {
        width: '100%',
        marginTop: 'auto'
    }
});