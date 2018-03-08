import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { colors } from 'src/constant/mixins'

export default class Tabs extends Component {
    
    state = {
        activeTab: 0
    }

    render({ children } = this.props) {
        return(
            <View style={styles.container}>
                <View style={styles.tabsContainer}>
                    { children.map(({ props: { title } }, index) => (
                        <TouchableOpacity
                            style={[
                                styles.tabContainer,
                                index === this.state.activeTab ? styles.tabContainerActive: []
                            ]}
                            onPress={() => this.setState({ activeTab: index })}
                            key={index}
                        >
                            <Text style={[
                                styles.tabText,
                                index === this.state.activeTab ? styles.tabTextActive: []
                            ]}>
                                {title}
                            </Text>
                        </TouchableOpacity>
                    )) }
                </View>
                <View style={styles.contentContainer}>
                    {children[this.state.activeTab]}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabsContainer: {
        flexDirection: 'row',
        height: 35
    },
    tabContainer: {
        flex: 1,
        width: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabContainerActive: {
        borderBottomColor: colors.meat,
    },
    tabText: {
        color: colors.gray,
        textAlign: 'center',
    },
    tabTextActive: {
        color: colors.meat,
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        marginTop: 5
    }
})