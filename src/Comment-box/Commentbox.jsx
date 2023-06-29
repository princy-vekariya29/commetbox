import React, { useEffect, useState } from 'react'
import {FaTrashAlt} from 'react-icons/fa'

const getData = () => {
    let getdata = JSON.parse(localStorage.getItem("data"));

    if (getdata != null) {
        return getdata;
    }
    return [];
}

const getDelete = () => {
    let data1 = JSON.parse(localStorage.getItem("data"));
    if(data1 != null){
        return data1;
    }
    console.log(data1);
    return [];
}

function Commentbox() {
    const [inputList, setinputList] = useState({
        fname: '',
        lname: '',
        cname: '',
        pno:'',
        ad:''
      
        
    });

    const [viewData, setviewData] = useState(getData());
    const [updateData, setUpdateData] = useState(false);
    const [upIndex, setupIndex] = useState(null);
    const [userDelete, setuserDelete] = useState(getDelete());

    // console.log("data",data);

    const handlechange = (e) => {
        let name = e.target.name;
        let value = e.target.value

        setinputList({ ...inputList, [name]: value })
        // console.log("name",name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Click");

        if(updateData){
            console.log("updatedata >>>",updateData);

            let newupdate = [...viewData];
            newupdate[upIndex] = inputList;

            setUpdateData(false)
            setviewData(newupdate);
            console.log("newupdate >>>",newupdate);
        }
        else{
            let uid = Math.floor(Math.random() * 100)

            let name = ({id : uid, ...inputList })
            console.log("uid", name);
            setviewData([...viewData, name])
        }
        setinputList({
            fname: '',
            lname: '',
            cname: '',
            pno: '',
            ad:''
        });

    }

    const handleUpdate = (id,index) => {
        // console.log("id >>>",id);
        let myData = getData();
        // console.log("myData",myData);
        let newData = myData.filter((d) => {
            // console.log("d",d);
            return d.id == id;
        })
        console.log("newData >>>", newData);
        setinputList(newData[0]);
        setUpdateData(true);
        setupIndex(index);

    }

    const handleDelete = (id) => {
        let myData = getData();
        // console.log("myData", myData);.
        let newDelete = myData.filter((d)=>{
            return d.id != id;
        });
        console.log("newDelete >>>",newDelete);
        setviewData(newDelete);
        setuserDelete([...newDelete,d]);
    }

    // localStorage main data
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(viewData));
        // console.log("data");
    }, [viewData])


    //Delete data useeffect
    useEffect(()=>{
        localStorage.setItem("useDelete",JSON.stringify(userDelete));
        console.log("Use effect 2");
    },[userDelete])




    return (
        <>
            <div className="container">
                <h1>
                    Commentbox
                </h1>

                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label className="form-label">First-Name</label>
                        <input type="text" className="form-control" name='fname' value={inputList.fname} onChange={handlechange} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last-Name</label>
                        <input type="text" className="form-control" name='lname' value={inputList.lname} onChange={handlechange} />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Course</label>
                        <input type="text" className="form-control" name='cname' value={inputList.cname} onChange={handlechange} />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Phone No:</label>
                        <input type="text" className="form-control" name='pno' value={inputList.pno} onChange={handlechange} />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" name='ad' value={inputList.ad} onChange={handlechange} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>

            </div>

            <div className="container">
                <div className="row">
                    {
                        viewData.length >= 1 ?
                            viewData.map((d,index) => {
                                return (
                                    <>
                                        <div className="d-flex justify-content-center align-items-center w-100" >
                                            <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                                <div className="toast-header">
                                                    <strong className="me-auto">
                                                        {
                                                            d.fname + " " + d.lname
                                                        }
                                                    </strong>
                                                    <button className='btn btn-danger' onClick={(e) => handleDelete(d.id)}>
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
                                                <div className="toast-body">
                                                    {
                                                        d.cname
                                                    }
                                                </div>
                                                <div className="toast-body">
                                                    {
                                                        d.pno 
                                                    }
                                                </div>
                                                <div className="toast-body">
                                                    {
                                                        d.ad
                                                    }
                                                </div>
                                                <div>
                                                    <button className='btn btn-warning' onClick={(e) => handleUpdate(d.id,index)}>
                                                        Update
                                                    </button>
                                                    <br/>
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            : ""
                    }
                </div>
            </div>

        </>
    )
}

export default Commentbox
