import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { digitalDate, timeFromDate } from "../../../utils/dateFormating";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { refreshPlanning } from "../../../utils/signals";

export default function RestaurantForm({
    startDate,
    user,
    destination,
    setIsOpen,
}) {
    const [error, setError] = useState(null);
    const [openDateModal, setOpenDateModal] = useState(false);
    const [date, setDate] = useState(
        startDate ? new Date(startDate.seconds * 1000) : new Date()
    );
    const [name, setName] = useState("");
    const [openTimeModal, setOpenTimeModal] = useState(false);
    const [time, setTime] = useState(
        startDate ? new Date(startDate.seconds * 1000) : new Date()
    );
    const [adress, setAdress] = useState("");
    const [number, setNumber] = useState("");

    const addStep = async () => {
        const docRef = doc(db, user, destination);

        if (name !== "") {
            await setDoc(doc(docRef, "planning", `restaurant-${name}`), {
                type: "Restaurant",
                name: name,
                date: date,
                time: time,
                adress: adress,
                number: number,
            })
                .then(() => {
                    setIsOpen(false);
                    refreshPlanning.dispatch();
                    setName("");
                    setDate(startDate ? new Date(startDate.seconds * 1000) : new Date());
                    setTime(startDate ? new Date(startDate.seconds * 1000) : new Date());
                    setAdress("");
                    setNumber("");
                })
                .catch((e) => {
                    setError(e.message);
                });
        } else {
            setError("Veuillez saisir un nom de restaurant");
        }
    };

    return (
        <>
            <TextInput
                style={styles.input}
                value={digitalDate(date)}
                onFocus={() => setOpenDateModal(true)}
                placeholder="Date"
            />
            <DatePicker
                modal
                open={openDateModal}
                style={styles.datePicker}
                date={date}
                onConfirm={(value) => {
                    setOpenDateModal(false);
                    setDate(value);
                }}
                onCancel={() => {
                    setOpenDateModal(false);
                }}
                mode="date"
                title="Selectionner une date"
                confirmText="Confirmer"
                cancelText="Annuler"
                theme="light"
            />

            <TextInput
                style={styles.input}
                value={name}
                placeholder="Nom du restaurant"
                onChangeText={(value) => setName(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />

            <TextInput
                style={styles.input}
                value={timeFromDate(time)}
                placeholder="Heure de réservation"
                onFocus={() => setOpenTimeModal(true)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <DatePicker
                modal
                open={openTimeModal}
                style={styles.datePicker}
                date={time}
                onConfirm={(value) => {
                    setOpenTimeModal(false);
                    setTime(value);
                }}
                onCancel={() => {
                    setOpenTimeModal(false);
                }}
                mode="time"
                title="Selectionner une heure de réservation"
                confirmText="Confirmer"
                cancelText="Annuler"
                theme="light"
            />
            <TextInput
                style={styles.input}
                value={adress}
                placeholder="Adresse"
                onChangeText={(value) => setAdress(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <TextInput
                style={styles.input}
                value={number}
                placeholder="Numéro de téléphone"
                onChangeText={(value) => setNumber(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
                keyboardType="number-pad"
            />

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={() => addStep()}>
                <Text style={styles.buttonText}>Ajouter</Text>
                <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        fontSize: 18,
        fontFamily: "NotoSans-Light",
        width: "100%",
        marginBottom: 20,
        height: 50,
    },
    error: {
        color: "red",
        textAlign: "center",
    },
    button: {
        alignSelf: "flex-end",
        marginTop: 20,
        marginBottom: 100,
        flexDirection: "row",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "Playfair-Regular",
    },
    arrow: {
        fontSize: 20,
        fontFamily: "NotoSans-Light",
        marginLeft: 10,
    },
});
