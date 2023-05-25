import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import { digitalDate, timeFromDate } from "../../../utils/dateFormating";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { refreshPlanning } from "../../../utils/signals";

export default function FlightForm({ startDate, user, destination, setIsOpen }) {
    const [error, setError] = useState(null);
    const [openDateModal, setOpenDateModal] = useState(false);
    const [openDepartureTimeModal, setOpenDepartureTimeModal] = useState(false);
    const [openArrivalTimeModal, setOpenArrivalTimeModal] = useState(false);
    const [date, setDate] = useState(startDate ? new Date(startDate.seconds * 1000) : new Date());
    const [departureAirport, setDepartureAirport] = useState("");
    const [arrivalAirport, setArrivalAirport] = useState("");
    const [departureTime, setDepartureTime] = useState(startDate ? new Date(startDate.seconds * 1000) : new Date());
    const [arrivalTime, setArrivalTime] = useState(startDate ? new Date(startDate.seconds * 1000) : new Date());
    const [reference, setReference] = useState("");
    const [gate, setGate] = useState("");
    const [seat, setSeat] = useState("");
    const addStep = async () => {
        const docRef = doc(db, user, destination);

        if (reference !== "") {
        await setDoc(doc(docRef, "planning", `vol-${reference}`), {
            type: "Vol",
            date: date,
            reference: reference,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            departureAirport: departureAirport,
            arrivalAirport: arrivalAirport,
            gate: gate,
            seat: seat
        })
            .then(() => {
                setIsOpen(false);
                refreshPlanning.dispatch();
                setDate(startDate ? new Date(startDate.seconds * 1000) : new Date());
                setDepartureAirport("");
                setArrivalAirport("");
                setDepartureTime(startDate ? new Date(startDate.seconds * 1000) : new Date());
                setArrivalTime(startDate ? new Date(startDate.seconds * 1000) : new Date());
                setReference("");
                setGate("");
                setSeat("");
            })
            .catch((e) => {
                setError(e.message);
            });
        } else {
            setError("Veuillez saisir une référence")
        }
    }

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
                value={departureAirport}
                placeholder="Aéroport de départ"
                onChangeText={(value) => setDepartureAirport(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <TextInput
                style={styles.input}
                value={arrivalAirport}
                placeholder="Aéroport d'arrivé"
                onChangeText={(value) => setArrivalAirport(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <TextInput
                style={styles.input}
                value={timeFromDate(departureTime)}
                placeholder="Heure de départ"
                onFocus={() => setOpenDepartureTimeModal(true)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <DatePicker
                modal
                open={openDepartureTimeModal}
                style={styles.datePicker}
                date={departureTime}
                onConfirm={(value) => {
                    setOpenDepartureTimeModal(false);
                    setDepartureTime(value);
                }}
                onCancel={() => {
                    setOpenDepartureTimeModal(false);
                }}
                mode="time"
                title="Selectionner une heure de départ"
                confirmText="Confirmer"
                cancelText="Annuler"
                theme="light"
            />
            <TextInput
                style={styles.input}
                value={timeFromDate(arrivalTime)}
                placeholder="Heure d'arrivée"
                onFocus={() => setOpenArrivalTimeModal(true)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <DatePicker
                modal
                open={openArrivalTimeModal}
                style={styles.datePicker}
                date={arrivalTime}
                onConfirm={(value) => {
                    setOpenArrivalTimeModal(false);
                    setArrivalTime(value);
                }}
                onCancel={() => {
                    setOpenArrivalTimeModal(false);
                }}
                mode="time"
                title="Selectionner une heure d'arrivée"
                confirmText="Confirmer"
                cancelText="Annuler"
                theme="light"
            />
            <TextInput
                style={styles.input}
                value={reference}
                placeholder="Référence du vol"
                onChangeText={(value) => setReference(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <TextInput
                style={styles.input}
                value={gate}
                placeholder="Porte d'embarquement"
                onChangeText={(value) => setGate(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <TextInput
                style={styles.input}
                value={seat}
                placeholder="Siège"
                onChangeText={(value) => setSeat(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />

            {error &&
                <Text style={styles.error}>{error}</Text>
            }

            <TouchableOpacity style={styles.button} onPress={() => addStep()}>
                <Text style={styles.buttonText}>Ajouter</Text>
                <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
        </>
    );
};

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
})