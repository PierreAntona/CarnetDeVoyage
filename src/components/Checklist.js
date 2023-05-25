import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Checklist = ({ user, destination }) => {

    const [items, setItems] = useState(null);
    const [newItem, setNewItem] = useState({
        title: "",
        state: false,
        number: 1
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!items) {
            getItems();
        }
    }, []);


    const docRef = doc(db, user, destination);

    const getItems = async () => {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setItems(docSnap.data().valise);
        }
    };

    const addItem = () => {
        if (newItem.title !== "") {
            updateDoc(docRef, {
                valise: [...items, newItem]
            })
                .then(() => {
                    getItems();
                    setNewItem({
                        title: "",
                        state: false,
                        number: 1
                    });
                })
                .catch((e) => {
                    setError(e.message);
                });
        }
    }

    const removeItem = (index) => {
        let newItems = items;
        newItems.splice(index, 1)
        updateDoc(docRef, {
            valise: newItems
        })
            .then(() => {
                getItems();
                newItems = items;
            })
            .catch((e) => {
                setError(e.message);
            });
    }

    const changeState = (index) => {
        let newItems = items;
        newItems[index].state ? newItems[index].state = false : newItems[index].state = true;

        updateDoc(docRef, {
            valise: newItems,
        })
            .then(() => {
                getItems();
            })
            .catch((e) => {
                setError(e.message);
            });
    }

    return (
        <View style={styles.container}>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    value={newItem.title}
                    placeholder="Nouvel item"
                    onChangeText={(value) => setNewItem({ ...newItem, title: value })}
                    placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
                />
                <View style={styles.numberHandler}>
                    <Text style={styles.numberInput}>{newItem.number}</Text>
                    <TouchableOpacity
                        style={styles.plus}
                        onPress={() => newItem.number > 0 && setNewItem({ ...newItem, number: newItem.number - 1 })}
                    >
                        <Text style={styles.plusText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.plus}
                        onPress={() => setNewItem({ ...newItem, number: newItem.number + 1 })}
                    >
                        <Text style={styles.plusText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {error &&
                <Text style={styles.error}>{error}</Text>
            }

            <TouchableOpacity style={styles.button} onPress={() => addItem()}>
                <Text style={styles.buttonText}>Ajouter</Text>
                <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <FlatList
                data={items}
                renderItem={(item) => {
                    return (
                        <View style={styles.list}>
                            <TouchableOpacity onPress={() => changeState(item.index)}>
                                <Text
                                    style={[
                                        styles.title,
                                        item.item.state && { textDecorationLine: "line-through" }
                                    ]}
                                >
                                    {item.item.title} ({item.item.number})
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.removeItem} onPress={() => removeItem(item.index)}>
                                <Text style={styles.removeItemText}>x</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                keyExtractor={(item) => item.title}
            />

        </View>
    )
}

export default Checklist;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20
    },
    list: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontFamily: "NotoSans-Light",
        fontSize: 18,
        marginBottom: 16
    },
    removeItem: {
        width: 24,
        height: 24,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16
    },
    removeItemText: {
        fontSize: 20,
        lineHeight: 20,
        fontFamily: "Playfair-Regular",
        color: "#E5CA93",
    },
    error: {
        color: "red",
        textAlign: "center",
    },
    form: {
        flexDirection: "column",
        width: "100%"
    },
    numberHandler: {
        flexDirection: "row",
        justifyContent: "space-between"

    },
    input: {
        borderBottomWidth: 1,
        fontSize: 18,
        fontFamily: "NotoSans-Light",
        marginBottom: 20,
        height: 50,
        width: "100%",
    },
    plus: {
        width: 50,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    plusText: {
        fontSize: 18,
        lineHeight: 25,
        color: "#E5CA93",
        fontFamily: 'NotoSans-Light',
    },
    numberInput: {
        borderWidth: 1,
        borderColor: "#000",
        height: 25,
        width: 150,
        fontFamily: 'NotoSans-Light',
        fontSize: 18,
        lineHeight: 23,
        marginHorizontal: 2,
        textAlign: "center"
    },
    button: {
        alignSelf: "flex-end",
        marginVertical: 24,
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