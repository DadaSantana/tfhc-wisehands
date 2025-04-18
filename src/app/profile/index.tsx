import React, { memo, useCallback } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { s } from './styles';
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { HeaderMenuBack } from "@/components/globals/headermenuback";

export default function Profile() {
    const router = useRouter();
    const auth = useAuth();
    const user = auth?.user;

    const userName = user?.name || 'Usuário';
    const userAvatar = user?.profile?.photo;
    const defaultAvatar = require('../../assets/avatar.jpg');

    return (
        <SafeAreaView style={s.container}>
            <HeaderMenuBack title="Menu" color={colors.white.default} />

            <View style={s.contentWrapper}>
                <TouchableOpacity
                    style={s.profileContainer}
                    onPress={() => router.push('/profile/myprofile')}
                >
                    <Image
                        source={userAvatar ? { uri: userAvatar } : defaultAvatar}
                        style={s.avatar}
                    />
                    <View style={s.profileInfo}>
                        <Text style={s.name}>{userName}</Text>
                        <Text style={s.profileText}>Profile</Text>
                    </View>
                    <FontAwesome5 name="chevron-right" size={20} color={colors.gray[400]} />
                </TouchableOpacity>

                <View style={s.presenceSection}>
                    <TouchableOpacity style={s.presenceButton} onPress={() => {
                        // TODO: Add presence logic
                    }}>
                        <Ionicons name="volume-medium-outline" size={24} color={colors.white.default} style={s.presenceIcon} />
                        <Text style={s.presenceText}>Marcar Presença</Text>
                    </TouchableOpacity>
                </View>

                <View style={s.footerContainer}>
                    <View style={s.socialIconsContainer}>
                        <TouchableOpacity onPress={() => {
                            // TODO: Add Social Link
                        }}>
                            <FontAwesome5 name="xing" size={20} color={colors.gray[400]} style={s.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            // TODO: Add Social Link
                        }}>
                            <FontAwesome5 name="linkedin-in" size={20} color={colors.gray[400]} style={s.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            // TODO: Add Social Link
                        }}>
                            <FontAwesome5 name="facebook-f" size={20} color={colors.gray[400]} style={s.socialIcon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={s.copyrightText}>
                        © 2025 JR Group. All rights reserved.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

