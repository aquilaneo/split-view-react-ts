import React from 'react';
import * as SplitView from "./splitView";

function App () {
	return (
		<div style={{height: "100vh"}}>
			<SplitView.SplitView>
				<SplitView.SplitPanel width={"20%"} widthPx={0}>あああ</SplitView.SplitPanel>
				<SplitView.SplitPanel width={"60%"} widthPx={0}>いいい</SplitView.SplitPanel>
				<SplitView.SplitPanel width={"20%"} widthPx={0}>ううう</SplitView.SplitPanel>
			</SplitView.SplitView>
		</div>
	);
}

export default App;
