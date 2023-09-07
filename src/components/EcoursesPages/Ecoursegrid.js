import React, { useState, useEffect } from "react";
import { EcoursesData } from "../../mock-d/EcoursesData";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect"; //Selection filter
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function EcoursesGrid() {
  const [ecourses, setEcourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState("");

  // FilterMatchMode library for filtering purposes.
  // contains=contain letters you search
  // IN= tick
  // equals=hybrid, online on ccampus
  // All filters on header
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    fields: { value: null, matchMode: FilterMatchMode.IN },
    university: { value: null, matchMode: FilterMatchMode.IN },
    location: { value: null, matchMode: FilterMatchMode.EQUALS }, //hybrid, online on ccampus
  });
  const [fieldsEnglish] = useState([
    { name: "Programming" },
    { name: "Mathematics" },
    { name: "Physics" },
    { name: "Biology" },
    { name: "English" },
    { name: "Greek" },
    { name: "Linguistics" },
    { name: "Psychology" },
    { name: "History" },
    { name: "Philosophy" },
    { name: "Engineering" },
    { name: "Art" },
  ]);
  const [universitiesEnglish] = useState([
    { name: "University of Piraeus" },
    { name: "National and Kapodistrian University of Athens" },
    { name: "EMP" },
    { name: "Univesity of West Attica" },
    { name: "OPA" },
    { name: "Panteion university" },
    { name: "Aristotle University of Thessaloniki" },
  ]);
  const [fieldsGreek] = useState([
    { name: "Προγραμματισμός" },
    { name: "Μαθηματικά" },
    { name: "Φυσική" },
    { name: "Βιολογία" },
    { name: "Αγγλικά" },
    { name: "Ελληνικά" },
    { name: "Γλωσσολογία" },
    { name: "Ψυχολογία" },
    { name: "Ιστορία-Αρχαιολογία" },
    { name: "Φιλοσοφία" },
    { name: "Μηχανική" },
    { name: "Τέχνη" },
  ]);
  const [universitiesGreek] = useState([
    { name: "Πανεπιστήμιο Πειραιώς" },
    { name: "Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών" },
    { name: "Εθνικό Μετσόβιο Πολυτεχνείο" },
    { name: "Πανεπιστήμιο Δυτικής Αττικής" },
    { name: "Οικονομικό Πανεπιστήμιο Αθηνών" },
    { name: "Πάντειο Πανεπιστήμιο" },
    { name: "Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης" },
  ]);

  const [fields] = useState(EcoursesData.getFieldName());

  const sortOptions = [
    { label: "Price High to Low", value: "!price" },
    { label: "Price Low to High", value: "price" },
  ];

  // sorting by Price
  const onSortChange = (event) => {
    const value = event.value;
    // descending
    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
      // ascending
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  // slice=ecourses from object array we want to view in home page. .slice(0, 9)
  // useEffect(() => {
  //   EcoursesData.getAllEcourses().then((data) => setEcourses(data));
  // }, []);
  useEffect(() => {
    EcoursesData.getAllEcourses().then((data) => {
      setEcourses(getEcourses(data));
      setLoading(false);
    });
  }, []);

  // function takes an array of data, ensures it's a valid array
  // (defaulting to an empty array if necessary), creates a shallow copy of the array to
  //  avoid mutation, and then converts the date property of each element into a JavaScript
  //  Date object. The modified array with updated date properties is then returned.
  const getEcourses = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);

      return d;
    });
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // field filter
  const fieldBodyTemplate = (rowData) => {
    const fields = rowData.fields;

    return (
      <div className="flex align-items-center gap-2">
        <span>{fields.name}</span>
      </div>
    );
  };

  // field filter
  const fieldItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{option.name}</span>
      </div>
    );
  };

  // University filter
  const universityBodyTemplate = (rowData) => {
    const universitiesEnglish = rowData.universitiesEnglish;

    return (
      <div className="flex align-items-center gap-2">
        <span>{universitiesEnglish.name}</span>
      </div>
    );
  };

  // University filter
  const universityItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{option.name}</span>
      </div>
    );
  };

  // location filter
  const locationBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getLocation(rowData.status)} />
    );
  };

  // location filter
  const locationItemTemplate = (option) => {
    return <Tag value={option} severity={getLocation(option)} />;
  };

  const fieldRowFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={fields}
        itemTemplate={fieldItemTemplate}
        onChange={(e) => options.filterApplyCallback(e.value)}
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
        maxSelectedLabels={1}
        style={{ minWidth: "14rem" }}
      />
    );
  };

  const universityRowFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={universitiesEnglish}
        itemTemplate={universityItemTemplate}
        onChange={(e) => options.filterApplyCallback(e.value)}
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
        maxSelectedLabels={1}
        style={{ minWidth: "14rem" }}
      />
    );
  };

  const locationRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={getLocation}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={locationItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  // Chips me "Online", "On Campus", "Hybrid"
  const getLocation = (ecourse) => {
    switch (ecourse.ecourseLocation) {
      // prasino "On campus" chip panw dejia sto ecourse
      case "On Campus":
        return "success";

      // kitrino "Online" chip panw dejia sto ecourse
      case "Online":
        return "warning";

      // Kokkino "Hybrid" chip panw dejia sto ecourse
      case "Hybrid":
        return "danger";

      default:
        return null;
    }
  };

  // when items are in Grid formation
  const gridItem = (ecourse) => {
    return (
      <div className="pb-5 col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-book"></i>
              {/* in span we add ecourse category. ex Programming, Education, Physics etc */}
              <span className="font-semibold">{ecourse.category}</span>
            </div>
            {/* Chips me "Online", "On Campus", "Hybrid" */}
            <Tag
              value={ecourse.ecourseLocation}
              // den allazoume to severity giati to xrwma twn chips ejartatai apo auth thn lejh
              severity={getLocation(ecourse)}
            ></Tag>
          </div>

          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              className="w-9 shadow-2 border-round"
              src={ecourse.image}
              alt={ecourse.title}
            />
            <div className="text-2xl font-bold">{ecourse.title}</div>
            <Rating value={ecourse.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">€{ecourse.price}</span>
            <Button
              icon="pi pi-heart"
              className="p-button-rounded"
              disabled={ecourse.ecourseLocation === "OUTOFSTOCK"}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (ecourse) => {
    // If we the grid icon is pressed print ecourses as a grid.If not as a list
    return gridItem(ecourse);
  };

  // //  Header with filters
  const header = () => {
    return (
      <Dropdown
        options={sortOptions}
        value={sortKey}
        optionLabel="label"
        placeholder="Sort By Price"
        onChange={onSortChange}
        className="w-full sm:w-14rem"
      />
    );
  };

  // add global search above other filters
  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };
  // const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={ecourses}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={[
          "name",
          "country.name",
          "fields.name",
          "university.name",
          "location",
        ]}
        header={header}
        emptyMessage="No customers found."
      >
        {/* Onoma */}
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        {/* Field */}
        <Column
          header="Field" //Κατεύθυνση
          filterField="fields"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "14rem" }}
          body={fieldBodyTemplate}
          filter
          filterElement={fieldRowFilterTemplate}
        />
        {/* University */}
        <Column
          header="University" //Πανεπιστήμιο
          filterField="university"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "14rem" }}
          body={universityBodyTemplate}
          filter
          filterElement={universityRowFilterTemplate}
        />
        {/* Location */}
        <Column
          field="location"
          header="Location"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={locationBodyTemplate}
          filter
          filterElement={locationRowFilterTemplate}
        />
      </DataTable>
      <DataView
        // kouti me ta 'x'(ex.9) ecourses
        value={ecourses}
        itemTemplate={itemTemplate}
        paginator
        rows={9}
        sortField={sortField}
        sortOrder={sortOrder}
        header={header()}
      />
    </div>
  );
}

export default EcoursesGrid;

// // Sample e-courses data
// const ecourses = [
//   {
//     id: 1,
//     title: "Introduction to Artificial Intelligence",
//     image: img,
//     university: "University of Piraeus",
//     professors: ["Dimitris Dimitris", "Gavalas Gavalas"],
//     duration: "12 weeks",
//     ECTS: 6,
//     rating: 4.5,
//     price: "$999",
//     mode: "Online",
//     description:
//       "This is a comprehensive introduction to the field of artificial intelligence, covering topics such as machine learning, robotics, and natural language processing.",
//   },
//   {
//     id: 2,
//     title: "Introduction to Artificial Intelligence",
//     image: img,
//     university: "University of Piraeus",
//     professors: ["Dimitris Dimitris", "Gavalas Gavalas"],
//     duration: "12 weeks",
//     ECTS: 6,
//     rating: 4.5,
//     price: "$999",
//     mode: "Online",
//     description:
//       "This is a comprehensive introduction to the field of artificial intelligence, covering topics such as machine learning, robotics, and natural language processing.",
//   },
//   {
//     id: 3,
//     title: "Introduction to Artificial Intelligence",
//     image: img,
//     university: "University of Piraeus",
//     professors: ["Dimitris Dimitris", "Gavalas Gavalas"],
//     duration: "12 weeks",
//     ECTS: 6,
//     rating: 4.5,
//     price: "$999",
//     mode: "Online",
//     description:
//       "This is a comprehensive introduction to the field of artificial intelligence, covering topics such as machine learning, robotics, and natural language processing.",
//   },
//   {
//     id: 4,
//     title: "Introduction to Artificial Intelligence",
//     image: img,
//     university: "University of Piraeus",
//     professors: ["Dimitris Dimitris", "Gavalas Gavalas"],
//     duration: "12 weeks",
//     ECTS: 6,
//     rating: 4.5,
//     price: "$999",
//     mode: "Online",
//     description:
//       "This is a comprehensive introduction to the field of artificial intelligence, covering topics such as machine learning, robotics, and natural language processing.",
//   },
// ];
// useEffect(() => {
//   EcoursesData.getProducts().then((data) => setProducts(data.slice(0, 12)));
// }, []);

// // State for favorites
// const [favorites, setFavorites] = useState([]);

// // Toggle favorite e-course
// const toggleFavorite = (id) => {
//   const isFavorited = favorites.includes(id);
//   if (isFavorited) {
//     setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
//   } else {
//     setFavorites([...favorites, id]);
//   }
// };
{
  /* <div className="ecourse-cards">
        {ecourses.map((ecourse) => (
          <EcourseCard
            key={ecourse.id}
            ecourse={ecourse}
            toggleFavorite={toggleFavorite}
            isFavorited={favorites.includes(ecourse.id)}
          />
        ))}
      </div> */
}

// // component gia to EcourseMainPage

// import React from "react";

// const Card = ({ item }) => {
//   // destructuring props
//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row justify-content-center">
//           {item.map((Val) => {
//             return (
//               <div
//                 className="col-md-4 col-sm-6 card my-3 py-3 border-0"
//                 key={Val.id}
//               >
//                 <div className="card-img-top text-center">
//                   <img src={Val.img} alt={Val.title} className="photo w-75" />
//                 </div>
//                 <div className="card-body">
//                   <div className="card-title fw-bold fs-4">
//                     {Val.title} &nbsp;&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;
//                     {Val.price}
//                   </div>
//                   <div className="card-text">{Val.desc}</div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Card;

//Test. H selida pou emfanizetai otan patame sto Ecourses-->Field.

// import React, { useState, useEffect } from "react";
// import "./EcourseMainPage.css";
// import { EcoursesData } from "../../mock-d/EcoursesData";

// function EcourseCard() {
//   const [ecourse, setEcourse] = useState(EcoursesData);
//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//           <h1 className="col-12 text-center my-3 fw-bold">E-Courses</h1>
//           <Card item={setEcourse} />
//         </div>
//       </div>
//     </>
//   );
// }

// export default EcourseCard;
