import React, { Component } from 'react';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.s2ab = this.s2ab.bind(this);
    }

    s2ab(s) { 
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf);  //create uint8array as viewer
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;    
    }

    render() {
        const wb = XLSX.utils.book_new();
        wb.Props = {
            Title: 'sheetjs Tutorials',
            Subject: 'Test File',
            Author: 'Wedupp',
            CreatedDate: new Date(),
        };
        wb.SheetNames.push('Guest List');
        const ws_data = [['Sr No', 'Name', 'Country Code', 'Mobile Number', 'On wed upp', 'Sangeet', 'Phere', 'Reception', 'Thank you message sent']];
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        wb.Sheets['Guest List'] = ws;
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary'});
        return (
            <div>
                <h1>Hello Kaushik...</h1>
                <div style={{paddingBottom: 30}}>
                    <button 
                        onClick={() => saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream'}), 'guestList.xlsx')}
                    >   Download
                    </button>
                </div>
                <div>
                    <input onChange={(event) => console.log(event.target.files[0])} type='file' />
                </div>
                <FilePond/>
            </div>
        );
    }
};

export default App;