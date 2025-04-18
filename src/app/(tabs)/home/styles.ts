import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    lastNewsWrapper: {
        marginBottom: 24,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 16,
        gap: 20,
    },
    headerContainer: {
        marginVertical: 16,
        marginBottom: 16,
        marginHorizontal: 18,
    },
    title: {
        fontSize: 24,
        fontFamily: fontFamily.montserratBold,
        color: '#000000',
    },
    subtitle: {
        fontSize: 24,
        fontFamily: fontFamily.montserratBold,
        color: '#FFB800',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        padding: 24,
        justifyContent: 'flex-end',
        borderRadius: 16,
    },
    bannerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Montserrat_600SemiBold',
        marginBottom: 4,
        textAlign: 'left',
    },
    bannerSubtitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'left',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E0E0E0', // Lighter gray for inactive dots
    },
    activeDot: {
        backgroundColor: '#000000', // Black for active dot
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Montserrat_500Medium',
        color: '#000000',
        marginBottom: 16,
    },
    functionalitiesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        gap: 8,
    },
    functionalityCard: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    cardGradient: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    functionalityIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF',
    },
    shareIcon: {
        width: 16,
        height: 16,
        tintColor: '#FFFFFF',
    },
    functionalityTitle: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Montserrat_700Bold',
        textAlign: 'left',
    },
    activitiesSection: {
        marginBottom: 24,
    },
    activitiesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    today: {
        fontSize: 16,
        fontFamily: fontFamily.montserratBold,
        color: '#FFB800',
    },
    event: {
        fontSize: 16,
        fontFamily: fontFamily.montserratBold,
        color: '#FFB800',
    },
});