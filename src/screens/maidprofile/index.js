import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { PrimaryButton, TopBarCard2 } from "../../components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons"
import { colors } from "../../common";
 
const MaidProfile = ({ navigation }) => {
    return (
        <View style={styles.maincontainer}>
            <View style={styles.subContainerOne}>
                <TopBarCard2 back={true} txt={'Maid Profile'} navigation={navigation} />
            </View>
            <View style={styles.subContainerTwo}>
 
                <Image style={styles.image} source={{}} />
 
                <View style={styles.subContainerTwoView}>
                    <Text style={styles.subContainerTwoText}>Ramalakshmi</Text>
                    <Text style={styles.subContainerTwoText}>7788778877</Text>
                </View>
            </View>
            <View style={styles.subContainerThree}>
                <View>
                    <MaterialCommunityIcons name="clock-time-four-outline" size={30} color="black" />
                </View>
                <View style={styles.subContainerThreeView}>
                    <Text style={styles.subContainerThreeText}>Free Time Slot</Text>
                    <Text style={styles.subContainerThreeText}>8Am-9Pm</Text>
                </View>
            </View>
 
            <View style={styles.subContainerFour} >
                <Octicons name="home" size={25} color="black" style={{paddingVertical:10}} />
                <View style={styles.subContainerFourText}>
                    <View>
                        <Text style={styles.subContainerFourText}>Helping in 2 Houses</Text>
                        <View >
                           <Text style={styles.subContainerFourTextTwo}>Working in your community</Text>
                        <Text style={styles.subContainerFourTextTwo}>for 2 months</Text>
                        </View>
                    </View>
                    <View style={styles.subContainerFourViewText}>
                        <View>
                            <Text style={styles.subContainerFourText}>B-Block 302</Text>
                            <Text style={styles.subContainerFourText}>B-Block 302</Text>
                        </View>
                        <View>
                            <Text style={styles.subContainerFourText}>2 Months</Text>
                            <Text style={styles.subContainerFourText}>8 Months</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.subContainerFive} >
                    <PrimaryButton
                        bgColor={colors.primaryColor}
                        text={'Add to household'}
                        shadow={true}
                        textColor={"white"}
                    />
                </View>
        </View>
    )
}
export default MaidProfile