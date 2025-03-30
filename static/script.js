function uploadImage() {
  let fileInput = document.getElementById("fileInput");
  let file = fileInput.files[0];
  if (!file) {
      alert("Please select an image");
      return;
  }
  let formData = new FormData();
  formData.append("file", file);
  fetch("/predict", {
      method: "POST",
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.error) {
          alert(data.error);
      } else {
          document.getElementById("result").innerText = "Prediction: " + data.category;
          let imgElement = document.getElementById("uploadedImage");
          imgElement.src = data.image_url;
          imgElement.style.display = "block";
      }

      if (data.category == 'organic') {
        document.getElementById("message_container").style.display = "inline";

        document.querySelector('.containe2').innerHTML = `
         <h1>Managing Organic Waste</h1>
            
            <h2>Reduce Waste at the Source</h2>
            <ul>
                <li>Buy only what you need to avoid food waste.</li>
                <li>Plan meals to minimize leftovers.</li>
                <li>Store food properly to prevent spoilage.</li>
            </ul>
            
            <h2>Reuse and Repurpose</h2>
            <ul>
                <li>Use food scraps for animal feed.</li>
                <li>Repurpose vegetable peels for homemade broths or natural dyes.</li>
            </ul>
            
            <h2>Composting</h2>
            <ul>
                <li><b>Home Composting:</b> Set up a compost bin for food scraps and garden waste.</li>
                <li><b>Vermicomposting:</b> Use worms to break down organic matter faster.</li>
                <li><b>Bokashi Composting:</b> Ferment food waste using microorganisms.</li>
            </ul>
            
            <h2>Biogas Production</h2>
            <ul>
                <li>Convert organic waste into biogas for cooking or energy production.</li>
            </ul>
            
            <h2>Community or Municipal Collection</h2>
            <ul>
                <li>Use organic waste collection programs that turn waste into compost or biofuel.</li>
            </ul>
            
            <h2>Use Organic Waste in Gardening</h2>
            <ul>
                <li>Banana peels, eggshells, and coffee grounds act as natural fertilizers.</li>
                <li>Mulching with grass clippings or leaves improves soil health.</li>
                <p>For more info on managing Organic waste  <a href='https://www.repsol.com/en/energy-and-the-future/future-of-the-world/organic-waste/index.cshtml' target="_blank">click here</a>  or   <a href='https://alliancebioversityciat.org/stories/organic-waste-recycling-sustainable-future-kenya' target="_blank">click here</a>  </p>
            </ul>
        `;
      }
      if (data.category == 'recyclable') {
        document.getElementById("message_container").style.display = "inline";

        document.querySelector('.containe2').innerHTML = `
          <header>
        <h1>How to Manage Recyclable Waste Efficiently ♻️</h1>
    </header>

    <section>
        <h2>1. Understanding Recyclable Waste Categories</h2>
        <ul>
            <li><strong>Plastics:</strong> Bottles, containers, packaging (Check recycling codes).</li>
            <li><strong>Paper & Cardboard:</strong> Newspapers, magazines, boxes (Remove food stains).</li>
            <li><strong>Glass:</strong> Bottles, jars (Rinse and remove lids).</li>
            <li><strong>Metals:</strong> Aluminum cans, tin containers (Clean before recycling).</li>
            <li><strong>E-Waste:</strong> Phones, batteries, computers (Take to e-waste centers).</li>
            <li><strong>Organic Waste:</strong> Food scraps, garden waste (Use for composting).</li>
        </ul>
    </section>

    <section>
        <h2>2. Sorting & Storing Recyclable Waste</h2>
        <p>Use separate bins for plastics, paper, glass, and metals. Label bins clearly to avoid mixing.</p>
    </section>

    <section>
        <h2>3. Finding Recycling Centers & Programs</h2>
        <p>Locate local recycling centers for specialized waste like electronics and hazardous materials.</p>
    </section>

    <section>
        <h2>4. Upcycling & Reusing Items</h2>
        <p>Instead of discarding, try:</p>
        <ul>
            <li>Using old glass jars for storage.</li>
            <li>Turning cardboard boxes into organizers.</li>
            <li>Repurposing old clothes into bags or cleaning rags.</li>
        </ul>
    </section>

    <section>
        <h2>5. Educating & Encouraging Others</h2>
        <p>Teach family and friends about sorting waste. Schools and offices can set up recycling programs.</p>
    </section>

    <section>
        <h2>6. Reducing Waste Before Recycling</h2>
        <p>Prevent waste by:</p>
        <ul>
            <li>Avoiding single-use plastics.</li>
            <li>Choosing digital documents over printed paper.</li>
            <li>Buying in bulk to reduce packaging waste.</li>
        </ul>
        <p>For more  info on where to recycle waste <a href='https://takatakasolutions.com/public-recycling-stations/'>click here</a></P>
    </section>

    <footer>
        <p> Small steps make a big impact! Start recycling today to protect the environment. 🌍</p>
    </footer>

        `

      }
      
  })
  .catch(error => console.error("Error:", error));
}
