import { lanContext } from '@/context/lan'
import { TranslateText } from '@/lib/translatetext'
import { Mail, MessageCircle, Share2, Twitter, X } from 'lucide-react-native'
import React, { useContext } from 'react'
import {
    Linking,
    Modal,
    Platform,
    Share as RNShare,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

interface ShareOption {
    name: string
    icon: React.ReactNode
    url: string
}

type Props = {
    Announcement: string
    setisShareOpen: React.Dispatch<React.SetStateAction<boolean>>
    isShareOpen: boolean
    shareUrl: string // Pass this as prop since there's no window.location in RN
}

export default function ShareSection({ Announcement, setisShareOpen, isShareOpen, shareUrl }: Props) {
    const { lan } = useContext(lanContext)
    const shareMessage = `📢 ${TranslateText[lan].CHECK_OUT_THIS_AMAZING}: ${Announcement} 🚀`
    const encodedMessage = encodeURIComponent(shareMessage)
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedMessageWithUrl = encodeURIComponent(`${shareMessage} ${shareUrl}`)

    const shareOptions: ShareOption[] = [
        {
            name: "WhatsApp",
            icon: <MessageCircle size={24} color="#ca8a04" />,
            url: `https://wa.me/?text=${encodedMessageWithUrl}`,
        },
        {
            name: "X (Twitter)",
            icon: <Twitter size={24} color="#ca8a04" />,
            url: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
        },
        {
            name: "Email",
            icon: <Mail size={24} color="#ca8a04" />,
            url: `mailto:?subject=${encodeURIComponent("Check this amazing announcement!")}&body=${encodedMessageWithUrl}`,
        },
    ]

    const handleShare = async (url: string) => {
        try {
            const canOpen = await Linking.canOpenURL(url)
            if (canOpen) {
                await Linking.openURL(url)
            }
        } catch (error) {
            console.error('Error opening URL:', error)
        }
    }

    // Native share functionality (alternative option)
    const handleNativeShare = async () => {
        try {
            await RNShare.share({
                message: `${shareMessage} ${shareUrl}`,
                url: shareUrl, // iOS only
                title: TranslateText[lan].SHARE_ANNOUNCEMENT,
            })
        } catch (error) {
            console.error('Error sharing:', error)
        }
    }

    const handleClose = () => {
        setisShareOpen(false)
    }

    return (
        <Modal
            visible={isShareOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Close Button */}
                    <TouchableOpacity
                        onPress={handleClose}
                        style={styles.closeButton}
                        accessibilityLabel="Close modal"
                    >
                        <X size={24} color="#000" />
                    </TouchableOpacity>

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Share2 size={24} color="#000" />
                            <Text style={styles.headerTitle}>
                                {TranslateText[lan].SHARE_ANNOUNCEMENT}
                            </Text>
                        </View>
                        <Text style={styles.headerSubtitle}>
                            {TranslateText[lan].HELP_OTHERS_DISCOVER}
                        </Text>
                    </View>

                    {/* Share Preview */}
                    <View style={styles.previewContainer}>
                        <View style={styles.previewBox}>
                            <Text style={styles.previewMessage}>
                                {shareMessage}
                            </Text>
                            <Text style={styles.previewUrl} numberOfLines={1}>
                                {shareUrl}
                            </Text>
                        </View>
                    </View>

                    {/* Share Options */}
                    <View style={styles.optionsContainer}>
                        {shareOptions.map((option) => (
                            <TouchableOpacity
                                key={option.name}
                                onPress={() => handleShare(option.url)}
                                style={styles.shareButton}
                                activeOpacity={0.7}
                                accessibilityLabel={`Share on ${option.name}`}
                            >
                                <View style={styles.iconContainer}>
                                    {option.icon}
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.shareButtonText}>
                                        {TranslateText[lan].SHARE_ON} {option.name}
                                    </Text>
                                </View>
                                <View style={styles.indicator} />
                            </TouchableOpacity>
                        ))}

                        {/* Optional: Native Share Button */}
                        <TouchableOpacity
                            onPress={handleNativeShare}
                            style={styles.shareButton}
                            activeOpacity={0.7}
                        >
                            <View style={styles.iconContainer}>
                                <Share2 size={24} color="#ca8a04" />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.shareButtonText}>
                                    {TranslateText[lan].SHARE_ON}
                                </Text>
                            </View>
                            <View style={styles.indicator} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        maxWidth: 448,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 12,
        marginRight: 4,
        marginTop: 4,
    },
    header: {
        paddingHorizontal: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginLeft: 12,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#374151',
    },
    previewContainer: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#f9fafb',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    previewBox: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    previewMessage: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 8,
        lineHeight: 20,
    },
    previewUrl: {
        fontSize: 12,
        color: '#374151',
        textDecorationLine: 'underline',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        backgroundColor: '#f9fafb',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    optionsContainer: {
        padding: 24,
        paddingTop: 16,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    iconContainer: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    shareButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ca8a04',
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        opacity: 0.3,
    },
})