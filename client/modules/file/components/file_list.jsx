import React from 'react';
import {GridList, GridTile, IconButton, Subheader} from 'material-ui';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

class FileList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderGrid(){
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={200}
          style={styles.gridList}
        >
          {this.props.files.map((file) => (
            <a key={file._id} href={"/files/" + file._id}>
              <GridTile
                key={file._id}
                title={file.title}
              >
                <img src={file.src} />
              </GridTile>
            </a>
          ))}
        </GridList>
      </div>
    )
  }

  render() {
    const {files} = this.props;
    if(!files){return <div></div>}
    return (
      <div>
        {this.renderGrid()}
      </div>
    );
  }
}

export default FileList;
