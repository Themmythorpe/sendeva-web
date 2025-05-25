import { LandingLayout } from "components/layout/LandingLayout";
import LandingPage from "../src/components/landing-page";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setConfigData, setLandingPageData } from "redux/slices/configData";
import Router from "next/router";
import SEO from "../src/components/seo";
import useGetLandingPage from "../src/api-manage/hooks/react-query/useGetLandingPage";
import { useGetConfigData } from "../src/api-manage/hooks/useGetConfigData";
import { CircularProgress, Box, Typography } from "@mui/material";
import TestError from "../src/components/TestError";

const Root = (props) => {
	const { configData, error: initialError } = props;
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(initialError);
	const [isNavigating, setIsNavigating] = useState(false);
	
	const { data, refetch, error: landingPageError } = useGetLandingPage();
	const dispatch = useDispatch();
	const { data: dataConfig, refetch: configRefetch, error: configError } = useGetConfigData();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				await Promise.all([configRefetch(), refetch()]);
			} catch (err) {
				setError(err);
				console.error('Error fetching data:', err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (landingPageError || configError) {
			setError(landingPageError || configError);
			console.error('Error in data fetching:', landingPageError || configError);
		}
	}, [landingPageError, configError]);

	useEffect(() => {
		if (data) {
			dispatch(setLandingPageData(data));
		}
		
		if (dataConfig && !isNavigating) {
			if (dataConfig.length === 0) {
				setIsNavigating(true);
				Router.replace("/404");
			} else if (dataConfig?.maintenance_mode) {
				setIsNavigating(true);
				Router.replace("/maintainance");
			} else {
				dispatch(setConfigData(dataConfig));
			}
		}
	}, [dataConfig, data, dispatch, isNavigating]);

	if (isLoading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
				p={3}
			>
				<Typography variant="h5" color="error" gutterBottom>
					Something went wrong
				</Typography>
				<Typography variant="body1" color="textSecondary" gutterBottom>
					{error.message || "Please try refreshing the page or contact support if the problem persists."}
				</Typography>
				<Box mt={2}>
					<button
						onClick={() => window.location.reload()}
						style={{
							padding: '8px 16px',
							backgroundColor: '#1976d2',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Refresh Page
					</button>
				</Box>
			</Box>
		);
	}

	return (
		<>
			<CssBaseline />
			{/* <DynamicFavicon configData={configData} /> */}
			<SEO
				image={configData?.fav_icon_full_url}
				businessName={configData?.business_name}
				configData={configData}
				title={configData?.business_name}
				description="add description here"
			/>
			{process.env.NODE_ENV === 'development' && <TestError />}
			{data && dataConfig && (
				<LandingLayout configData={dataConfig} landingPageData={data}>
					<LandingPage
						configData={dataConfig}
						landingPageData={data}
					/>
				</LandingLayout>
			)}
		</>
	);
};

export default Root;

export const getServerSideProps = async (context) => {
	const { req, res } = context;
	const language = req.cookies.languageSetting;

	try {
		const configRes = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
			{
				method: "GET",
				headers: {
					"X-software-id": 33571750,
					"X-server": "server",
					"X-localization": language,
					origin: process.env.NEXT_CLIENT_HOST_URL,
				},
			}
		);

		if (!configRes.ok) {
			throw new Error(`Failed to fetch config: ${configRes.status}`);
		}

		const config = await configRes.json();

		// Set cache control headers for 1 hour (3600 seconds)
		res.setHeader(
			"Cache-Control",
			"public, s-maxage=3600, stale-while-revalidate"
		);

		return {
			props: {
				configData: config,
			},
		};
	} catch (error) {
		console.error('Error in getServerSideProps:', error);
		
		// Return a fallback config or error state
		return {
			props: {
				configData: null,
				error: {
					message: "Unable to load configuration. Please try again later."
				},
			},
		};
	}
};
