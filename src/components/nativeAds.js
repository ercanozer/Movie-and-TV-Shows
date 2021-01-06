import React from 'react';

import NativeAdView, {
    CallToActionView,
    IconView,
    HeadlineView,
    TaglineView,
    AdvertiserView,
    AdBadge,
    ImageView,
    StarRatingView,
    MediaView
} from "react-native-admob-native-ads";
import { View } from 'react-native';
import { windowHeight } from '../styles';
const NativeAds = ({ changeShowState, showAd }) => {

    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#092a35',
                    margin: 15,
                    borderRadius: 10,
                    overflow: 'hidden',
                }}
            >
                <NativeAdView
                    style={{
                        width: "100%",
                        alignSelf: "center",
                        justifyContent: 'space-around'
                    }}
                    onAdLoaded={() => changeShowState()}
                    adUnitID="ca-app-pub-2852605001804865/4123572170" // TEST adUnitID
                >
                    {showAd && <View
                        style={{
                            height: '100%',
                            width: "100%",
                        }}
                    >

                        <ImageView resizeMode="cover" style={{ width: '100%', height: windowHeight / 2.5 / 2 }} />
                        <View style={{ marginLeft: 14, marginRight: 14, marginTop: 10, marginBottom: 10 }}>
                            <HeadlineView style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }} />
                            <TaglineView style={{ color: 'gray', fontSize: 15 }} />
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between', marginBottom: 10 }}>
                            <IconView style={{ width: 50, height: 50, borderRadius: 10 }} />
                            <StarRatingView maxStars={5} />
                            <CallToActionView
                                style={{
                                    height: 35,
                                    paddingHorizontal: 30,
                                    backgroundColor: "purple",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 5,
                                    elevation: 4,
                                }}
                                textStyle={{ color: "white", fontSize: 14 }}
                            />


                        </View>

                    </View>
                    }
                </NativeAdView>
            </View>
        </>
    );
}

export default NativeAds;