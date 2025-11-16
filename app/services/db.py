def add_to_db(db, item):
    db.add(item)
    db.commit()
    db.refresh(item)