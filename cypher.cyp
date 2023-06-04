CREATE (i:Image {id: 1, url: "https: //plus.unsplash.com/premium_photo-1661508614319-b5e40d1143bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", title: "Cat", tags: ["Kitten", "Kitty"]});
CREATE (i:Image {id: 2, url: "https: //images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", title: "Funky Cat", tags: ["Animal", "Kitten"]});
CREATE (i:Image {id: 3, url: "https: //images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", title: "Catoid", tags: ["Cute", "Cat"]});
CREATE (i:Image {id: 4, url: "https: //images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", title: "Cute Cat", tags: ["Animal", "Crazy"]});
CREATE (i:Image {id: 5, url: "https: //images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", title: "Cat", tags: ["Adorable", "Cat"]});
CREATE (i:Image {id: 6, url: "https: //images.unsplash.com/photo-1618826411640-d6df44dd3f7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", title: "Catoda", tags: ["Feline", "Kitty"]});
CREATE (i:Image {id: 7, url: "https: //images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", title: "Funny Cat", tags: ["Cat", "Amazing"]});
CREATE (i:Image {id: 8, url: "https: //images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", title: "Nice Kitty", tags: ["Adorable", "Sweet"]});
CREATE (i:Image {id: 9, url: "https: //images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", title: "Pretty Cat", tags: ["Animal", "Feline"]});
CREATE (i:Image {id: 10, url: "https: //images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", title: "Uwu Cat", tags: ["Kitten", "Kitty"]});

CREATE (a:Photographer { id: 1, name: "Zuzanna Wiejska", description: "A talented Photographer with a passion for cats" });

CREATE (a:Photographer { id: 2, name: "Michal Kruk", description: "Great artist with a portfolio full of cats, kittens and sometimes dogs" });

CREATE (a:Photographer { id: 3, name: "Szymon Krzykacz", description: "Professional photographer" });

CREATE (a:Photographer { id: 4, name: "Kordian Spokojny", description: "Amateur with outstanding talent for capturing feline faces" });

CREATE (a:Photographer { id: 5, name: "Agata Oko", description: "An artist focused on nature and wildlife photography" });

CREATE (u:User { id: 1, username: "u1", password: "1234", email: "a@e.pl" });

CREATE (u:User { id: 2, username: "user2", password: "safepassword1", email: "example@example.com" });

MATCH (i:Image { id: 1 })
CREATE (c:Comment { id: 3, text: "Nice picture" })
CREATE (i)-[:COMMENT]->(c);

MATCH (i:Image { id: 5 })
CREATE (c:Comment { id: 2, text: "Meh" })
CREATE (i)-[:COMMENT]->(c);

MATCH (i:Image { id: 5 })
CREATE (c:Comment { id: 3, text: "Cute" })
CREATE (i)-[:COMMENT]->(c);

MATCH (u:User { id: 1 }), (c:Comment {id: 1})
CREATE (u)-[:AUTHOR]->(c);

MATCH (u:User { id: 2 }), (c:Comment {id: 2})
CREATE (u)-[:AUTHOR]->(c);

MATCH (u:User { id: 1 }), (c:Comment {id: 3})
CREATE (u)-[:AUTHOR]->(c);

MATCH ()-[g:GRADE]->(r:RATING)
DETACH DELETE g, r

MATCH (p:Photographer { id: 1 }), (i:Image {id: 1})
CREATE (p)-[:AUTHOR]->(i);

MATCH (p:Photographer { id: 2 }), (i:Image {id: 2})
CREATE (p)-[:AUTHOR]->(i);

MATCH (p:Photographer { id: 2 }), (i:Image {id: 3})
CREATE (p)-[:AUTHOR]->(i);

MATCH (p:Photographer { id: 1 }), (i:Image {id: 4})
CREATE (p)-[:AUTHOR]->(i);

MATCH (p:Photographer { id: 1 }), (i:Image {id: 5})
CREATE (p)-[:AUTHOR]->(i);

MATCH (p:Photographer { id: 3 }), (i:Image {id: 6})
CREATE (p)-[:AUTHOR]->(i);

MATCH (p:Photographer { id: 4 }), (i:Image {id: 7})
CREATE (p)-[:AUTHOR]->(i);

MATCH (p:Photographer { id: 4 }), (i:Image {id: 8})
CREATE (p)-[:AUTHOR]->(i);

MATCH (p:Photographer { id: 5 }), (i:Image {id: 9})
CREATE (p)-[:AUTHOR]->(i);

MATCH (p:Photographer { id: 5 }), (i:Image {id: 10})
CREATE (p)-[:AUTHOR]->(i);

CREATE (i:Image {id: 11, url: "https: //images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", title: "Uncomfortably long title that makes it annoying", tags: ["Kitten", "Kitty", "Cat", "Feline", "Cute", "Adorable", "Sweet", "Aww", "Tiger"]});

MATCH (p:Photographer { id: 5 }), (i:Image {id: 11})
CREATE (p)-[:AUTHOR]->(i);

MATCH (i:Image { id: 11 })
CREATE (r:Rating { likes: 10000, dislikes: 1 })
CREATE (i)-[:GRADE]->(r);

MATCH (i1:Image), (i2:Image)
WHERE i1 <> i2 AND size(i1.tags) > 0 AND size(i2.tags) > 0 AND any(t IN i1.tags
WHERE t IN i2.tags)
MERGE (i1)-[:RELATED]->(i2)
MERGE (i2)-[:RELATED]->(i1)

CREATE (u:User { id: 3, username: "a", password: "a", email: "a@a.pl" });

// OTHER

CREATE (i:Image {id: 12, url: "https: //images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", title: "Kitty"})
CREATE (i:Image {id: 13, url: "https: //images.unsplash.com/photo-1460572894071-bde5697f7197?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60", title: "Cute Cat"})
CREATE (i:Image {id: 14, url: "https: //images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60", title: "Kitty Cat"})
CREATE (i:Image {id: 15, url: "https: //images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60", title: "Cat"})
CREATE (i:Image {id: 16, url: "https: //images.unsplash.com/photo-1455970022149-a8f26b6902dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60", title: "Funny Cat"})
CREATE (i:Image {id: 17, url: "https: //images.unsplash.com/photo-1552944150-6dd1180e5999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60", title: "Funky Cat"})
CREATE (i:Image {id: 18, url: "https: //images.unsplash.com/photo-1567270671170-fdc10a5bf831?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60", title: "Kitty"})
CREATE (i:Image {id: 19, url: "https: //images.unsplash.com/photo-1545398865-0062dafeb74d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60", title: "Cat"})
CREATE (i:Image {id: 20, url: "https: //images.unsplash.com/photo-1609231617449-112c1371bc8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60", title: "Cat"})

docker run -p7474:7474 -p7687:7687 -d -v C:\\neo4j\data:/data -v C:\\neo4j\logs:/logs -v C:\\neo4j\import:/var/lib/neo4j/import -v C:\\neo4j\plugins:/plugins --name neo4j-apoc -e NEO4J_apoc_export_file_enabled= true -e NEO4J_apoc_import_file_enabled= true -e NEO4J_apoc_import_file_use__neo4j__config= true -e NEO4JLABS_PLUGINS=\[\"apoc\"\] --env NEO4J_AUTH=neo4j/test1234 neo4j:4.4

docker run --name testneo4japoc -p7474:7474 -p7687:7687 -d -v C:\\neo4j\data:/data -v C:\\neo4j\logs:/logs -v C:\\neo4j\import:/var/lib/neo4j/import -v C:\\neo4j\plugins:/plugins --env NEO4J_AUTH=neo4j/test1234 -e NEO4J_apoc_export_file_enabled= true -e NEO4J_apoc_import_file_enabled= true -e NEO4J_apoc_import_file_use__neo4j__config= true -e NEO4JLABS_PLUGINS=\[\"apoc\"\] neo4j:4.4
