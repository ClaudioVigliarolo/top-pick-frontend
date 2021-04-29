import React from "react";
import CardNumber from "../custom/CardNumber";
import Tabs from "../switches/Tabs";
import Button from "../buttons/TabButton";
import ChartBar from "../charts/ChartBar";
import { getStatsReports } from "../../api/api";
import { countByDate, countToday } from "../../utils/stats";
import { createStyles, makeStyles } from "@material-ui/core";
import {
  Data,
  Lang,
  StatsClientRequest,
  StatsContent,
} from "../../interfaces/Interfaces";

interface ReportsChartProps {
  currentLanguage: Lang;
  token: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    tabsContainer: {
      width: 350,
      height: 150,
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    },
    container: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      height: "100%",
      alignItems: "center",
    },
    chartContainer: {
      //backgroundColor: "red",
      width: "60%",
    },
    chartHeader: {
      color: "#fff",
      textAlign: "center",
      fontSize: 30,
    },
  })
);

export default function ActivityChart({
  currentLanguage,
  token,
}: ReportsChartProps) {
  const [clientstats, setClientstats] = React.useState<Data[]>([
    { label: "1d", value: 0 },
    { label: "1w", value: 0 },
    { label: "1m", value: 0 },
    { label: "3m", value: 0 },
    { label: "1y", value: 0 },
    { label: "max", value: 0 },
  ]);
  const classes = useStyles();

  React.useEffect(() => {
    (async () => {
      const retrievedStats = await getStatsReports(currentLanguage, token);
      if (retrievedStats != null) {
        console.log("Uu", retrievedStats);

        const newClientStats = clientstats;
        //count today
        var date = new Date();
        newClientStats[0].value = countByDate(
          retrievedStats,
          new Date(date.getFullYear(), date.getMonth(), date.getDate())
        );

        newClientStats[1].value = countByDate(
          retrievedStats,
          new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
        );
        newClientStats[2].value = countByDate(
          retrievedStats,
          new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
        );

        newClientStats[3].value = countByDate(
          retrievedStats,
          new Date(date.getFullYear(), date.getMonth() + 1, 1)
        );

        newClientStats[4].value = countByDate(
          retrievedStats,
          new Date(date.getFullYear(), date.getMonth() + 3, 1)
        );

        newClientStats[5].value = countByDate(
          retrievedStats,
          new Date(date.getFullYear() + 1, date.getMonth(), 1)
        );

        newClientStats[5].value = countByDate(
          retrievedStats,
          new Date(date.getFullYear() + 1000, date.getMonth(), 1)
        );

        setClientstats(newClientStats);
      }
    })();
  }, [currentLanguage]);

  //ordina i dati con il timestamp. Come ordinare?
  //li posso fare separatamente
  return (
    <div className={classes.container}>
      <div className={classes.chartContainer}>
        <div className={classes.chartHeader}>Requests</div>
        <ChartBar data={clientstats} />
      </div>
    </div>
  );
}
