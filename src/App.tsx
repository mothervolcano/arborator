import { ParamSet, Model, Param } from "./types";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";

import {
  Container,
  Flex,
  Stack,
  Title,
  Text,
  DEFAULT_THEME,
  Space,
  ColorPicker,
  Button,
  Divider,
  NativeSelect,
} from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import Stage from "./Stage";
import { testModel } from "./collections/test";

// .......................................................

const models = [ testModel ]

// --------------------------------------------------------------
// LAYOUT COMPONENTS

const Layout = ({ orientation, children }: any) => {
  if (orientation === "LANDSCAPE") {
    return (
      <Flex direction="row">
        <div
          style={{
            position: "relative",
            minWidth: "300px",
            maxWidth: "25%",
            overflowY: "auto",
          }}
        >
          {children[0]}
        </div>
        <div style={{ position: "relative", minWidth: "250px", flexGrow: "1" }}>
          {children[1]}
        </div>
      </Flex>
    );
  } else if (orientation === "PORTRAIT") {
    return (
      <Stack justify="flex-start" align="stretch">
        <div style={{ position: "relative" }}>{children[1]}</div>
        <div style={{ position: "relative", overflowY: "auto" }}>
          {children[0]}
        </div>
      </Stack>
    );
  } else {
    return null;
  }
};

function App() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [currentScene, setCurrentScene] = useState<any>(models[0]);
  // const [currentScene, setCurrentScene] = useState<any>("");

  const [stage, setStage] = useState<any>(null);
  const [consoleParams, setConsoleParams] = useState<ParamSet>(
    currentScene.params,
  );
  const [hasFill, setHasFill] = useState<boolean>(true);
  const [artColor, setArtColor] = useState("#000000");
  const [scaleCtrl, setScaleCtrl] = useState(3);


  // -------------------------------------------------------------------------------------------------------
  // MEDIA QUERIES

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const isPortrait = useMediaQuery("(orientation: portrait)");

  // -------------------------------------------------------------------------------------------------------
  // HANDLERS

  /**
   * Handler for the scene selections
   * */

  const handleSceneSelectionInput = (event: HTMLSelectElement) => {
    const selectedScene = models.find((scene) => scene.option === event.value);
    if (selectedScene) {
      const prevParams: Param[] = consoleParams;
      const currBaseWidthParam = prevParams.find(
        (p) => p.id === "baseWidthCtrl",
      );
      const currBaseDepthParam = prevParams.find(
        (p) => p.id === "baseDepthCtrl",
      );
      const currBaseHeightParam = prevParams.find(
        (p) => p.id === "baseHeightCtrl",
      );
      const newParams = selectedScene.params.map((p) => {
        if (initialized) {
          if (
            currBaseWidthParam &&
            p.id === currBaseWidthParam.id
          ) {
            p.value = currBaseWidthParam.value;
          }
          if (
            currBaseDepthParam &&
            p.id === currBaseDepthParam.id
          ) {
            p.value = currBaseDepthParam.value;
          }
          if (
            currBaseHeightParam &&
            p.id === currBaseHeightParam.id
          ) {
            p.value = currBaseHeightParam.value;
          }   
        }
        return p;
      });

      setCurrentScene(selectedScene);

      if (newParams) {
        setConsoleParams(newParams);
      }
    }
  };

  /**
   * Handler for the console
   * */
  const handleParamCtrlInputForModel = (updatedParams: any) => {
    setInitialized(true);
    setConsoleParams(updatedParams);
  };

  const downloadArtwork = (event: SyntheticEvent) => {
    event.preventDefault();

    if (stage) {
      const url =
        "data:image/svg+xml;utf8," + encodeURIComponent(stage.exportSVG());
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = "test.svg";
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const copyArtworkToClipboard = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (stage) {
      const svgData = stage.exportSVG();
      try {
        await navigator.clipboard.writeText(svgData);
        console.log("SVG data copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy SVG data: ", err);
      }
    }
  };

  const clearModel = (event: SyntheticEvent) => {
    event.preventDefault();

    if (stage) {
      stage.clear();
    }
  }

  // -------------------------------------------------------------------------------------------------------
  // STYLES

  const frameMargin = 6;
  const dark = DEFAULT_THEME.colors.dark[5];
  const softDark = DEFAULT_THEME.colors.dark[0];
  const light = DEFAULT_THEME.colors.gray[0];
  const softLight = DEFAULT_THEME.colors.gray[2];

  const containerStyle = {
    // position: "relative",
    width: "100%",
    height: "100vh",
    padding: isDesktop ? `${frameMargin}vh` : "0",
  };

  const frameStyle = {
    border: (isDesktop ? `1px solid ${dark}` : "none"),
    borderRadius: (isDesktop ? `10px` : "none"),
  };

  const stageStyle = {
    height: isLandscape ? `${100 - frameMargin * 2}vh` : `45vh`,
    borderLeft: isLandscape ? `1px solid ${dark}` : "none",
    borderBottom: isLandscape ? "none" : `1px solid ${dark}`,
    backgroundColor: "#ffffff",
    borderRadius: (isDesktop ? `0 9px 9px 0` : "none"),
  };

  const consoleLayoutType = isPortrait ? "ROW" : "COL";
  const consoleLayoutMode = isPortrait ? "COMPACT" : "NORMAL";

  // -------------------------------------------------------------------------------------------------------
  // BLOCKS

  const consoleSwitch = (model: Model, layout: string, mode: string) => {
    const Console = model.console;
    return (
      <Console
        params={consoleParams}
        inputHandler={handleParamCtrlInputForModel}
        layout={layout}
        mode={mode}
      />
    );
  };

  const title = () => {
    return (
      <div
        style={{
          position: "absolute",
          top: "0.50rem",
          left: "1rem",
        }}
      >
        <Title c={dark}>Isotopo</Title>
      </div>
    );
  };

  const Actions = () => {
    return (
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2.3rem",
          width: "100%",
        }}
      >
        <>
          <Flex justify="flex-end">
            <Button
              style={{}}
              color="#61BEC1"
              ml="1rem"
              variant="outline"
              onClick={clearModel}
            >
              Clear
            </Button>
            <Button
              style={{}}
              color="#61BEC1"
              ml="1rem"
              variant="outline"
              onClick={copyArtworkToClipboard}
            >
              Copy
            </Button>
          </Flex>
        </>
      </div>
    );
  };

  const panel = () => {
    return (
      <div style={{ width: "100%" }}>
        <Stack w={"100%"} pt="0.5rem" pl="1rem" pr="1rem" gap={15}>
          <div>
            <p
              style={{
                margin: "1rem 0 0.75rem 0",
                fontSize: (isPortrait ? "0.80rem" : "0.90rem"),
                fontWeight: (isPortrait ? "400" : "500"),
                color: (isPortrait
                  ? "var(--mantine-color-dark-2)"
                  : "var(--mantine-color-dark-3)")

              }}
            >
              Select Tool:
            </p>
            <NativeSelect
              value={currentScene.option}
              onChange={(event) =>
                handleSceneSelectionInput(event.currentTarget)
              }
              data={models.map((model) => {
                return { label: model.label, value: model.option };
              })}
            />
          </div>
          {consoleSwitch(currentScene, consoleLayoutType, consoleLayoutMode)}
        </Stack>
      </div>
    );
  };

  return (
    <div>
        <div style={containerStyle}>
          <div style={frameStyle}>
            <Layout orientation={isLandscape ? "LANDSCAPE" : "PORTRAIT"}>
              {panel()}
              <Stage
                style={stageStyle}
                model={currentScene.generator}
                params={consoleParams}
                setStageManager={setStage}
                setParams={setConsoleParams}
              >
                {!isLandscape && title()}
                {isLandscape && Actions()}
              </Stage>
            </Layout>
          </div>
        </div>
    </div>
  );
}

export default App;
