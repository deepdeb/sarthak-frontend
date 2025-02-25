import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';



@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {

  isDisabled: boolean = false;
  sbuId: any = sessionStorage.getItem('sbu_id');
  segmentName: string = '';
  segmentId: any;
  segmentId_1: any;
  segmentId_2: any;
  segmentId_3: any;
  segmentIdEdit: any;
  subSegmentIdEdit: any;
  subSegmentName: string = '';
  subSubSegmentName: string = '';
  subSubSubSegmentName: string = '';
  subSegmentId: any;
  subSegmentId_1: any;
  subSegmentId_2: any;
  subSubSegmentId: any;
  subSubSegmentId_1: any;
  segmentList: any = [];
  subSegmentList: any = [];
  subSubSegmentList: any = [];
  subSubSubSegmentList: any = [];
  sbuList: any = [];
  designation_id: any = sessionStorage.getItem('designation_id');
  totalCount: number = 0;
  salesPersonId: any = sessionStorage.getItem('sales_person_id');
  display_1: boolean = true;      //segment
  display_2: boolean = false;     //sub-segment
  display_3: boolean = false;     //sub sub-segment
  display_4: boolean = false;     //sub sub-sub-segment

  isEditSegment: boolean = false;
  isEditSubSegment: boolean = false;


  segment_list() {
    this.display_1 = true;
    this.display_2 = false;
    this.display_3 = false;
    this.display_4 = false;
  }
  sub_segment_list() {
    this.display_1 = false;
    this.display_2 = true;
    this.display_3 = false;
    this.display_4 = false;
    this.totalCount = 0;
  }

  sub_sub_segment_list() {
    // this.segmentId_2 = ''
    this.display_1 = false;
    this.display_2 = false;
    this.display_3 = true;
    this.display_4 = false;
    this.totalCount = 0;
  }
  sub_sub_sub_segment_list() {
    // this.segmentId_2 = ''
    // this.subSegmentId_1 = ''
    this.display_1 = false;
    this.display_2 = false;
    this.display_3 = false;
    this.display_4 = true;
    this.totalCount = 0;
  }


  constructor(private rest: RestService, private router: Router, private common: CommonService) { }

  ngOnInit(): void {
    this.getSegmentList();
    this.getSBUList();
  }

  //************* SBU listing function start ************//
  getSBUList() {
    const data = {
      sbu_id: this.sbuId
    }
    this.rest.getSBUList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            console.log('>>>', res.response)
            this.sbuList = [];
            this.sbuList = res.response;
          }
        }
      }
    })
  }



  //************  segment creation function start ***********//


  //******* add new segment ******//
  addNewSegment() {
    if (!this.segmentName) {
      this.common.showAlertMessage('Please enter a New Segment', this.common.errContent)
      return;
    }
    const data = {
      segment_name: this.segmentName
    };
    this.rest.createSegment(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.segmentName = '';
          this.common.showAlertMessage(res.message, this.common.succContent);
          this.getSegmentList();
        }
      }
    })
  }


  //******** edit segment logic *********//
  getSegmentToForm(segment_id: any, segment_name: any) {
    this.isEditSegment = true;
    this.segmentIdEdit = segment_id;
    this.segmentName = segment_name;
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  editSegment() {
    if(!this.segmentName) {
      this.common.showAlertMessage('Enter segment name', this.common.errContent);
      return;
    }
    const data = {
      segment_id: this.segmentIdEdit,
      segment_name: this.segmentName
    }
    this.rest.editSegment_rest(data).subscribe((res: any) => {
      if(res.success) {
        if(res.message) {
          this.common.showAlertMessage(res.message, this.common.succContent);
          this.getSegmentList();
          this.isEditSegment = false;
          this.segmentIdEdit = '';
          this.segmentName = '';
        }
      }
    })
  }
  //******** edit segment logic *********//


  //******* add new sub-segment ******//
  addNewSubSegment() {
    if (!this.segmentId) {
      this.common.showAlertMessage('Please Choose a segment', this.common.errContent)
      return;
    }
    if (!this.subSegmentName) {
      this.common.showAlertMessage('Please Enter a New Sub-Segment', this.common.errContent)
      return;
    }
    const data = {
      segment_id: this.segmentId,
      subsegment_name: this.subSegmentName,
    };
    this.rest.createSubSegment(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.getSubSegmentList();
          this.segmentId = '';
          this.subSegmentName = '';
          this.common.showAlertMessage(res.message, this.common.succContent);
        }
      }
    })
  }


  //******* edit sub segment logic *******//
  getSubSegmentToForm(segment_id: any, subsegment_id: any, subsegment_name: any) {
    this.isEditSubSegment = true;
    this.segmentId = segment_id;
    this.subSegmentIdEdit = subsegment_id;
    this.subSegmentName = subsegment_name;
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  editSubSegment() {
    if(!this.subSegmentName) {
      this.common.showAlertMessage('Enter sub segment name', this.common.errContent)
      return;
    }
    const data = {
      segment_id: this.segmentId,
      subsegment_id: this.subSegmentIdEdit,
      subsegment_name: this.subSegmentName
    }
    this.rest.editSubSegment_rest(data).subscribe((res: any) => {
      if(res.success) {
        if(res.message) {
          this.common.showAlertMessage(res.message, this.common.succContent);
          this.getSubSegmentList();
          this.isEditSubSegment = false;
          this.segmentId = '';
          this.subSegmentIdEdit = '';
          this.subSegmentName = '';
        }
      }
    })
  }
  //******* edit sub segment logic *******//


  //******* add new sub-sub-segment ******//
  addNewSubSubSegment() {
    if (!this.segmentId_1) {
      this.common.showAlertMessage('Please Choose a segment', this.common.errContent)
      return;
    }
    if (!this.subSegmentId) {
      this.common.showAlertMessage('Please Choose a sub-segment', this.common.errContent)
      return;
    }
    if (!this.subSubSegmentName) {
      this.common.showAlertMessage('Please Enter a New Sub-Sub-Segment', this.common.errContent);
      return;
    }
    const data = {
      segment_id: this.segmentId_1,
      subsegment_id: this.subSegmentId,
      subsubsegment_name: this.subSubSegmentName,
    };
    this.rest.createSubSubSegment(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.getSubSubSegmentList();
          this.segmentId_1 = '';
          this.subSegmentId = '';
          this.subSubSegmentName = '';
          this.common.showAlertMessage(res.message, this.common.succContent);
        }
      }
    })
  }

  //******* add new sub-sub-sub-segment ******//
  addNewSubSubSubSegment() {
    if (!this.segmentId_3) {
      this.common.showAlertMessage('Please Choose a segment', this.common.errContent)
      return;
    }
    if (!this.subSegmentId_2) {
      this.common.showAlertMessage('Please Choose a sub-segment', this.common.errContent)
      return;
    }
    if (!this.subSubSegmentId_1) {
      this.common.showAlertMessage('Please Choose a sub-sub-segment', this.common.errContent)
      return;
    }
    if (!this.subSubSubSegmentName) {
      this.common.showAlertMessage('Please Enter a New Sub-Sub-Sub-Segment', this.common.errContent);
      return;
    }
    const data = {
      segment_id: this.segmentId_3,
      subsegment_id: this.subSegmentId_2,
      subsubsegment_id: this.subSubSegmentId_1,
      subsubsubsegment_name: this.subSubSubSegmentName
    }
    this.rest.createSubSubSubSegment_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.message) {
          this.getSubSubSubSegmentList();
          this.segmentId_3 = '',
            this.subSegmentId_2 = '',
            this.subSubSegmentId_1 = '',
            this.subSubSubSegmentName = ''
          this.common.showAlertMessage(res.message, this.common.succContent)
        }
      }
    })
  }


  //************  segment creation function end ***********//    



  //************  segment listing function start ***********//
  getSegmentList() {
    this.rest.getSegmentList_rest().subscribe((res: any) => {
      if (res.success) {
        this.segmentList = [];
        if (res.response) {
          if (res.response.length > 0) {
            this.segmentList = res.response;
            this.totalCount = res.total_count;
          }
        }
      }
    })
  }

  //************  segment listing function end ***********//



  //************  segment listing function end ***********//

  getSubSegmentList() {
    this.sub_segment_list();
    const data = {
      segment_id: this.segmentId_1 || this.segmentId_2 || this.segmentId_3
    }
    this.rest.getSubSegmentList_rest(data).subscribe((res: any) => {
      if (res.success) {
        this.subSegmentList = [];
        if (res.response) {
          if (res.response.length > 0) {
            this.subSegmentList = res.response;
            this.totalCount = res.total_count;
          }
        }
      }
    })
  }

  getSubSubSegmentList() {
    this.sub_sub_segment_list();
    const data = {
      segment_id: this.segmentId || this.segmentId_1 || this.segmentId_2 || this.segmentId_3,
      subsegment_id: this.subSegmentId || this.subSegmentId_1 || this.subSegmentId_2
    }
    this.rest.getSubSubSegmentList_rest(data).subscribe((res: any) => {
      if (res.success) {
        this.subSubSegmentList = [];
        if (res.response) {
          if (res.response.length > 0) {
            this.subSubSegmentList = res.response;
            this.totalCount = res.total_count;
          }
        }
      }
    })
  }

  getSubSubSubSegmentList() {
    this.sub_sub_sub_segment_list();
    const data = {
      segment_id: this.segmentId || this.segmentId_1 || this.segmentId_2 || this.segmentId_3,
      subsegment_id: this.subSegmentId || this.subSegmentId_1 || this.subSegmentId_2,
      subsubsegment_id: this.subSubSegmentId || this.subSubSegmentId_1
    }
    this.rest.getSubSubSubSegmentList_rest(data).subscribe((res: any) => {
      if (res.success) {
        this.subSubSubSegmentList = []
        if (res.response) {
          if (res.response.length > 0) {
            this.subSubSubSegmentList = res.response;
            this.totalCount = res.total_count;
          }
        }
      }
    })
  }
}
