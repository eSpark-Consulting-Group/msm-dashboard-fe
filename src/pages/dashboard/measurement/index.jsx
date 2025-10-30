import { useSelector } from "react-redux";
import { Box, Card } from "@mui/material";
import InfoCard from "../../../components/info-card";
import { DynamicTabs, SubHeader } from "../../../components";
import { ccData, ctRatioData, voltageData } from "../../../constant";

const Measurement = () => {
    const { user } = useSelector((state) => state.auth);


    const tabs = [
        {
            label: "CT Ratios",
            component: (
                <InfoCard
                    info={ctRatioData()}
                    title="CT Ratios"
                    role={user?.role?.name}
                    type={"CTR"}
                />
            ),
        },
        {
            label: "Voltage",
            component: (
                <InfoCard
                    info={voltageData()}
                    title="Voltage"
                    role={user?.role?.name}
                    type={"Voltage"}
                />
            ),
        },
        {
            label: "Current Calibration",
            component: (
                <InfoCard
                    info={ccData()}
                    title="Current Calibration"
                    role={user?.role?.name}
                    type={"CC"}
                />
            ),
        },
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
            <SubHeader
                heading={"Measurement"}
                subHeading={"Here’s what’s happening with your device and users"}
                variant="blue"
            />
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 1090,
                        borderRadius: 3,
                        boxShadow: 3,
                        p: 4,
                        position: "relative",
                        overflow: "visible",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <DynamicTabs tabs={tabs} width="fit-content" maxWidth={650} />
                </Card>
            </Box>
        </Box>
    );
};

export default Measurement;
