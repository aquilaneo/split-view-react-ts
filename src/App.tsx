import React from 'react';
import * as SplitView from "./splitView";

function App () {
	return (
		<div style={{height: "100vh"}}>
			<SplitView.SplitView>
				<SplitView.SplitPanel initialWidth={"20%"} minWidth={"10%"}>あああ</SplitView.SplitPanel>
				<SplitView.SplitPanel initialWidth={"60%"} minWidth={"40%"}>いいい</SplitView.SplitPanel>
				<SplitView.SplitPanel initialWidth={"20%"} minWidth={"10%"}>ううう</SplitView.SplitPanel>
			</SplitView.SplitView>
		</div>
	);
}

export default App;
