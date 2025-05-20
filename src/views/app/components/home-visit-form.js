import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaPaperPlane } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { useHomeVisitPackageDropDown, useHomeVisit, useHomeAreaList } from "hooks/homeVisit";
import { useCity } from "hooks/home";
import { useService } from "hooks/service";
import { Select, message } from "antd";
import { useHistory, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Accordion from "react-bootstrap/Accordion";

const { Option } = Select;

const HomeVisitForm = (props) => {
    const { id, packagename, amount } = useParams();
    const { defaultCity } = props;

    let history = useHistory();
    const { register, handleSubmit, reset,setValue } = useForm();


    //  Package Listing

    const { mutate: packages, isLoading: load } = useHomeVisitPackageDropDown();
    const [packageData, setPackageData] = useState(null);

    const onFetchPackages = (searchParams) => {
        const nformData = JSON.stringify(searchParams);
        packages(nformData, {
            onSuccess: (data) => {
                setPackageData(data?.packages)
            }
        });
    }

    useEffect(() => {
        if (defaultCity) {
            const params = {
                "cityId": defaultCity,
                "package_name": "AG-care",
            }
            onFetchPackages(params);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultCity]);

    useEffect(() => {
        if (packagename) {
            document.getElementById('home-visit-form').scrollIntoView({ behavior: 'smooth', block: "start" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [packagename]);



    // Test Listing

    const [testData, setTestData] = useState(null);
    const { mutate: testDropdown, isLoading: loading } = useService();

    const onFetch = (searchParams) => {
        const nformData = JSON.stringify(searchParams);
        testDropdown(nformData, {
            onSuccess: (data) => {
                setTestData(data?.test)
            }
        });
    }

    useEffect(() => {
        if (defaultCity) {
            const params = {
                "cityId": defaultCity,
            }
            onFetch(params);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultCity]);




    //  Table listing

    const [name, setName] = useState(null)
    const [test, setTest] = useState(null)


    const onChangePackage = (e) => {
        let data = [];
        packageData?.length > 0 && packageData?.map((item) => {
            e?.forEach((val) => {
                if (item.id === val) {
                    data.push(item);
                }
            })
            return data;
        });
        setName(data);
    }

    const onChangeTest = (e) => {
        let data = [];
        testData?.length > 0 && testData?.map((item) => {
            e?.forEach((val) => {
                if (item.id === val) {
                    data.push(item);
                }
            })
            return data;
        });
        setTest(data);
    }



    //  Add fees

    const packagetotal = name?.map((item) => item?.fees)?.reduce(
        (acc, cur) => Number(acc) + Number(cur),
        0) ?? 0;

    const testTotal = test?.map((item) => item?.fees)?.reduce(
        (acc, cur) => Number(acc) + Number(cur),
        0) ?? 0;

    const total = packagetotal + testTotal + Number(amount ?? 0);




    const selectProps = {
        mode: 'multiple',
        placeholder: 'Select Item...',
        maxTagCount: 'responsive',
    };


    const { data: cityList } = useCity();
    //  Submit Form

    const { mutate: addVisit, isLoading: btnloading } = useHomeVisit();
    const submitHandler = (e) => {
        console.log('area',e.areaId,area)
       
        if (e.date === "") {
            message.error('Visit Date is Required')
        }
        else if (e.cityId === "-- Select City --") {
            message.error('City is Required')
        }
        else if(area?.length !== 0 && (e.areaId === undefined || e.areaId === "-- Select Locality / Area --" || area === null || e.areaId === null)){
            message.error('Locality/ Area is Required')
        }
        // else if (e.areaId === undefined || e.areaId === "-- Select Locality / Area --") {
        //     message.error('Locality/ Area is Required')
        // }
        // else if (area.length !== 0 || area !== null || area !== undefined) {
        //     message.error('Locality/ Area is Required')
        // }
        else if (e.first_name === "") {
            message.error('Your Name is Required')
        }
        else if (e.mobile === "") {
            message.error('Mobile Number is Required')
        }
        else {
            const formData = new FormData();
            formData.append("packageId", (id ? id : name?.map((item) => item?.id) || ""))
            formData.append("title", test?.map((item) => item?.id) || "")
            formData.append("first_name", e.first_name)
            formData.append("email", e.email)
            formData.append("mobile", e.mobile)
            formData.append("address", e.address)
            formData.append("date", e.date)
            formData.append("cityId", e.cityId)
            formData.append("areaId", e.areaId)
            formData.append("remark", e.remark)
            addVisit(formData, {
                onSuccess: (item) => {
                    if (item?.Status === 200) {
                        message.success(item?.Message)
                        reset();
                        setTimeout(() => {
                            history.push("/thank-you-home-visit")
                        }, 1000);
                    }
                    else {
                        message.error(item?.Message)
                        reset();
                    }
                },
                onError: (error) => {
                    console.log(error)
                }
            });
        }

    }




    const [cityId, setCityId] = useState(null);

    const areaIdChange = (e) => {
        setCityId(e.target.value)
        setValue('areaId',null)
    }

    //  Area  Listing

    const { mutate: areaData, isLoading: loadArea } = useHomeAreaList();
    const [area, setArea] = useState(null);

    const onFetchArea = (searchParams) => {
        const nformData = JSON.stringify(searchParams);
        areaData(nformData, {
            onSuccess: (data) => {
                setArea(data?.data)
            }
        });
    }

    useEffect(() => {
        if (cityId) {
            const params = {
                "cityId": cityId,
            }
            onFetchArea(params);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityId]);


    return (
        <section className="bg-light-orange" id="home-visit-form">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h2 className="text-center">Fill out this below Form and</h2>
                        <h3 className="text-center">Get tested in the comfort of your home</h3>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} sm={12} md={12} lg={10} xl={9}>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>I want to select package/ test/s.</Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col xs={12} sm={12} md={6} lg={6} className="pb-4">
                                                <p className="mb-0 text-dark">Select Package</p>
                                                {/*  <SelectfilterOption={(input, option) => option?.children?.toLowerCase()?.includes(input)} */}
                                                {id ?
                                                    <Form.Control value={packagename} {...register("packageId")} />
                                                    :
                                                    <Select
                                                        {...selectProps}
                                                        {...register("packageId")} mode="multiple" placeholder={load ? "Please Wait....." : "Search by Package Name"} optionFilterProp="children" getPopupContainer={trigger => trigger.parentNode} disabled={loading} loading={loading} onChange={onChangePackage} showSearch>
                                                        {packageData && packageData.map((common, a) => (
                                                            <option key={a} value={common?.id}>{common?.packageName}</option>
                                                        ))}
                                                    </Select>}
                                            </Col>
                                            <Col xs={12} sm={12} md={6} lg={6} className="pb-4">
                                                <p className="mb-0 text-dark">Search by Test Title</p>
                                                <Select
                                                    {...selectProps}
                                                    {...register("title")} mode="multiple" placeholder={loading ? "Please Wait....." : "Search by Test Title"} optionFilterProp="children" getPopupContainer={trigger => trigger.parentNode} disabled={loading} loading={loading} onChange={onChangeTest} showSearch>
                                                    {testData && testData?.map((common, a) => (
                                                        <Option key={a} value={common?.id}>{common?.testName}</Option>
                                                    ))}
                                                </Select>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>

                                                {name || test || id ?
                                                    <p className="services-table">
                                                        <Table striped className="mb-0">
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Type</th>
                                                                    <th className="text-right">Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {name?.map((item, i) => (
                                                                    <tr key={i}>
                                                                        <td>{item?.packageName}</td>
                                                                        <td>Package</td>
                                                                        <td className="text-right">{item?.fees}</td>
                                                                    </tr>
                                                                ))}
                                                                {test?.map((item, i) => (
                                                                    <tr key={i}>
                                                                        <td>{item?.testName}</td>
                                                                        <td>Test</td>
                                                                        <td className="text-right">{item?.fees}</td>
                                                                    </tr>
                                                                ))}

                                                                {id ? <tr>
                                                                    <td>{packagename}</td>
                                                                    <td>Package</td>
                                                                    <td className="text-right">{amount}</td>
                                                                </tr> : null}
                                                                <tr>
                                                                    <td className="text-end" colSpan={2}><h5 className="mb-0"><strong className="text-dark">Total</strong></h5></td>
                                                                    <td><h5 className="mb-0 text-right"><strong className="text-dark">{total && `₹ ${total}`} </strong></h5></td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </p> : null}
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <Row>

                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <h4 className="mb-3 mt-3 pb-0">Patient Details</h4>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} className="pb-4">
                                    <p className="mb-0 text-dark">Visit Date <strong className="text-red">*</strong></p>
                                    <Form.Control type="date" {...register("date")} name="date" />
                                    {/* {errors.date && <span>This field is required</span>} */}
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} className="pb-4">
                                    <p className="mb-0 text-dark">City <strong className="text-red">*</strong></p>
                                    <Form.Select {...register("cityId")} onChange={areaIdChange}>
                                        <option>-- Select City --</option>
                                        {cityList?.city && cityList?.city?.map((common, a) => (
                                            <option key={a} value={common?.cityId} >{common?.city}</option>
                                        ))}
                                    </Form.Select>
                                    {/* {errors.cityId && <span>This field is required</span>} */}
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} className="pb-4">
                                    <p className="mb-0 text-dark">Locality / Area  <strong className="text-red">{area?.length !== 0 ? "*" : ""}</strong></p>
                                    <Form.Select {...register("areaId")} disabled={cityId !== null ? false : true} loading={cityId !== null ? false : true} placeholder={loadArea ? "Please Wait....." : "Select Locality / Area"}>
                                        <option>-- Select Locality / Area --</option>
                                        {area && area?.map((common, a) => (
                                            <option key={a} value={common?.areaId}>{common?.area}</option>
                                        ))}
                                    </Form.Select>
                                    {/* {errors.areaId && <span>This field is required</span>} */}
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} className="pb-4">
                                    <p className="mb-0 text-dark">Your Name <strong className="text-red">*</strong></p>
                                    <Form.Control type="text" {...register("first_name")} placeholder="Enter Your Name" />
                                    {/* {errors.first_name && <span>This field is required</span>} */}
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} className="pb-4">
                                    <p className="mb-0 text-dark">Mobile Number <strong className="text-red">*</strong></p>
                                    <Form.Control type="tel" minlength="10" maxlength="10" {...register("mobile")} placeholder="Enter Your Phone Number" />
                                    {/* {errors.mobile && <span>This field is required</span>} */}
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} className="pb-4">
                                    <p className="mb-0 text-dark">Email ID</p>
                                    <Form.Control type="email" {...register("email")} placeholder="Enter Your Email Address" />
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} className="pb-4">
                                    <p className="mb-0 text-dark">Address</p>
                                    <Form.Control as="textarea" {...register("address")} rows={3} />
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} className="pb-4">
                                    <p className="mb-0 text-dark">Remarks</p>
                                    <Form.Control className="mb-2" as="textarea" {...register("remark")} rows={3} />
                                    <p className="mb-0"><small className="text-danger">*Home Visit charges will be additional.</small></p>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <p className="text-center">
                                        {btnloading ? <Button className="btn1" disabled><FaPaperPlane /> &nbsp; Book Home Visit</Button> : <Button className="btn1" type="submit"><FaPaperPlane /> &nbsp; Book Home Visit</Button>}
                                    </p>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section >
    );
}


export default HomeVisitForm;