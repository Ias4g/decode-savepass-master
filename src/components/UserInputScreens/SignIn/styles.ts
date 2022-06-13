import { StyleSheet } from "react-native";

export const styled = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: "#F2F3F5",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 40
    },

    form: {
        width: "100%",
        marginVertical: 10,
    },

    description: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 40
    }
});
