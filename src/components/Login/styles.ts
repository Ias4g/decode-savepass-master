import { StyleSheet } from "react-native";

export const styled = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    modalView: {
        width: "90%",
        padding: 20,
        elevation: 5,
        borderRadius: 20,
        shadowRadius: 20,
        textAlign: "center",
        marginTop: 180,
        shadowColor: "#000",
        alignItems: "center",
        shadowOpacity: 0.25,
        backgroundColor: "#F2F3F5",
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    form: {
        width: "100%",
        marginVertical: 20,
    },

    logo: {
        width: 156,
        height: 156,
        // marginTop: 50,
        // marginBottom: 30
    },

    description: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 40
    }
});
