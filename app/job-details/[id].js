import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { useRouter, useSearchParams, Stack } from "expo-router";
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES, icons } from "../../constants";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";

const tabs = ["About", "Qualification", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error } = useFetch("job-details", {
    job_id: params.id,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = () => {};

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualification":
        return (
          <Specifics
            title="Qualification"
            points={data[0]?.job_highlights?.Qualifications ?? ["N / A"]}
          />
        );
      case "About":
      case "Responsibilities":
      default:
        break;
    }
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={"60%"}
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension={"60%"} />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data?.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0]?.employer_logo}
                jobtitle={data[0]?.job_title}
                companyName={data[0]?.employer_name}
                location={data[0]?.job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;

const styles = StyleSheet.create({});
