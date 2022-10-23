# Custom React Audio Visualizer

## Usage
Help create Audio Visualizer quickly and more convenient.
##### _One line of code worths thousands lines of explanations._

```typescript
import React, { useEffect } from "react";
import {
  audioConnector,
  AudioConnectorLegacy,
} from "custom-react-audio-visualizer";
const Container: React.FC<any> = () => {
    const [audioUrl, setAudioUrl] = React.useState(DEFAULT_URL);
    useEffect(() => {
       audioConnector.setup(
          "test",
          audioUrl,
          "red"
        );
    }, [])
    return <div>xyz</div>
}

export default Container
```

## Development
1. Git clone the project ``https://github.com/duc168/custom-react-audio-visualizer.git``
2. Install lerna globally if you have not installed lerna yet, run ``yarn global add lerna``
3. Run ``yarn`` to install the first packages
4. ``yarn start`` to start developing
5. ``yarn stop`` to stop developing
6. ``yarn build`` to build a new version

##### _Happy coding!_
