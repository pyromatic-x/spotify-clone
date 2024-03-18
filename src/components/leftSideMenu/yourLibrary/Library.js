import { memo, useCallback, useState } from "react";
import MainContainer from "../../MainContainer";
import Header from "./Header";
import LibraryList from "./LibraryList";

const ContainerSX = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  overflowY: "scroll",
  padding: "0 10px 14px 10px",
};

const Library = memo(function Library() {
  const [headerShadow, setHeaderShadow] = useState(false);

  const onSetHeaderShadow = useCallback(() => {
    setHeaderShadow(!headerShadow);
  }, [headerShadow]);

  return (
    <MainContainer sx={ContainerSX}>
      <Header headerShadow={headerShadow} />
      <LibraryList
        setHeaderShadow={onSetHeaderShadow}
        headerShadow={headerShadow}
      />
    </MainContainer>
  );
});

export default Library;
